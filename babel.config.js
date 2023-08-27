const glob = require('glob');
const path = require('path');

const mapper = {
  TextVariants: 'Text',
  ButtonVariant: 'Button',
  ModalVariant: 'Modal',
  WizardContextConsumer: 'WizardContext',
  DropdownPosition: 'dropdownConstants',
  EmptyStateVariant: 'EmptyState',
  TextListItemVariants: 'TextListItem',
  TextListVariants: 'TextList',
  getDefaultOUIAId: 'ouia',
  useOUIAProps: 'ouia',
  PaginationVariant: 'Pagination',
};

module.exports = {
  presets: [
    // Polyfills
    '@babel/env',
    // Allow JSX syntax
    '@babel/react',
  ],
  plugins: [
    // Put _extends helpers in their own file
    '@babel/plugin-transform-runtime',
    // Support for {...props} via Object.assign({}, props)
    '@babel/plugin-proposal-object-rest-spread',
    // Devs tend to write `import { someIcon } from '@patternfly/react-icons';`
    // This transforms the import to be specific which prevents having to parse 2k+ icons
    // Also prevents potential bundle size blowups with CJS
    [
      'transform-imports',
      {
        '@patternfly/react-icons': {
          transform: (importName) =>
            `@patternfly/react-icons/dist/js/icons/${importName
              .split(/(?=[A-Z])/)
              .join('-')
              .toLowerCase()}`,
          preventFullImport: true,
        },
        '@patternfly/react-core': {
          transform: (importName) => {
            const files = glob.sync(
              path.resolve(__dirname, `./node_modules/@patternfly/react-core/dist/esm/**/${mapper[importName] || importName}.js`)
            );

            if (files.length > 0) {
              return files[0].replace(/.*(?=@patternfly)/, '');
            } else {
              throw `File with importName ${importName} does not exist`;
            }
          },
          preventFullImport: false,
          skipDefaultConversion: true,
        },
        '@patternfly/react-table': {
          skipDefaultConversion: true,
          transform: `@patternfly/react-table/dist/esm`,
        },
      },
      'react-icons',
    ],
  ],
};
