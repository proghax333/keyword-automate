
const removeUndefinedTerm = (arr) => {
  const terms = arr.map((term_array) => {
    return term_array.filter(x => typeof x !== 'undefined')
  });
  return terms;
};

const combinations = (...a) => removeUndefinedTerm(a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat()))));

module.exports = {
  combinations
};