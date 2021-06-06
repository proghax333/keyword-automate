
const { combinations } = require('./cartesian');

function createTerm(term, props) {
  const result = {
    title: term,
    terms: [term, ...(props.terms || [])],
    prefixes: props.prefixes || [],
    suffixes: props.suffixes || [],
    exact: props.exact || []
  };
  return result;
}

function generateSearchTerms(term) {
  let result = combinations(term.prefixes, term.terms, term.suffixes).concat(combinations(term.exact, [undefined]));
  result = result.map(arr => arr.join(' '));

  return {
    title: term.title,
    terms: result
  };
}

module.exports = {
  createTerm,
  generateSearchTerms
};
