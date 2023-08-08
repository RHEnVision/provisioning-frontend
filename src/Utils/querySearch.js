const jsonata = require('jsonata');

const OPERATORS = ['<', '>', '='];

const parseQuery = (query) => {
  query = query.replace('memory', 'memory_mib');
  query = query.replace('storage', 'storage_gb');
  if (OPERATORS.every((operator) => !query.includes(operator))) {
    query = `name ~> /${query}/i`;
  }
  return `types[${query}]`;
};

export const evaluateQuery = async (query, data) => {
  const q = parseQuery(query);
  const d = { types: data };
  try {
    const expression = jsonata(q);
    const result = await expression.evaluate(d);
    if (!result) return { error: false, result: [] };
    return { error: false, result };
  } catch (e) {
    return { error: true, result: e };
  }
};
