# Testing

`jest` is the primary testing framework,  `testing-library` as react-testing framework
and `msw` for mocking the network requests/responses.

## Mocking the server
[msw](https://mswjs.io) is used to mock the network layer

### Mocking a request with a predefined handler

For mocking a request globally:
1. Create a fixture object for your mocked data - `mockedData.fixtures.js`
2. Add an handler request in `/mocks/handler`  
```js
import mockedData from './mockedData.fixtures.js';

export const handlers = [
  // ...other handlers  
  rest.get(provisioningUrl('<YOUR_ENDPOINT>'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedData));
  }),
];
```
When tests try to fetch `/<YOUR_ENDPOINT>` it will return the mocked data

### Mocking a request by override a predefined handler
Sometimes we'd like to override a response handler in a specific test, for example testing errors or network delays:

```js
  test('Loading state', async () => {
    const { server, rest } = window.msw;
    // this override the the request only in this test and simulates delay network
    server.use(
      rest.get(provisioningUrl('<YOUR_ENDPOINT>'), (req, res, ctx) => {
        return res(ctx.delay(10000), ctx.status(200));
      })
    );
  }
```

## Custom render
In order to access `GlobalState` and `react-query` provider, the `render` function of `testing-library` is altered with a wrapper.
You can import all `testing-library` related functions from `mocks/utils`

```js
import { render, fireEvent, screen } from '../../mocks/utils';

  test('Loading state', async () => {
    // the component will be rended with globalState and react-query provider
    render(<Component />)
  }
```
If needed, import `render` directly from `@testing-library/react`