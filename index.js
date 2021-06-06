const fs = require('fs');
const { createTerm, generateSearchTerms } = require('./terms');
const { combinations } = require('./cartesian');
const stringify = require('csv-stringify');
const { readLines } = require('./file');

const locations = readLines('./data/locations.txt');

let topics = [
  createTerm('Cyber Security', {
    exact: readLines('./data/Cyber Security.txt'),
  }),
  createTerm('CERT-IN Cyber Security Audit', {
    exact: readLines('./data/CERT-IN.txt'),
  }),
  createTerm('ISO Compliance', {
    exact: readLines('./data/ISO Compliance.txt'),
  }),
  createTerm('PCI DSS Compliance', {
    exact: readLines('./data/PCI DSS Compliance.txt'),
  }),
  createTerm('SOC Compliance', {
    exact: readLines('./data/SOC Compliance.txt'),
  }),
  createTerm('HIPAA Compliance', {
    exact: readLines('./data/HIPAA Compliance.txt'),
  }),
  createTerm('GDPR Compliance', {
    exact: readLines('./data/GDPR Compliance.txt'),
  }),
  createTerm('FISMA Compliance', {
    exact: readLines('./data/FISMA Compliance.txt'),
  }),
  createTerm('GRC Compliance', {
    exact: readLines('./data/GDR Compliance.txt'),
  }),
];

const baseTerms = topics.map((term) => {
  return generateSearchTerms(term);
});

let totalSearchTerms = 0;
baseTerms.forEach((term) => {
  const title = term.title;
  const searchTerms = term.terms;
  const stringifier = stringify({
    delimiter: ',',
  });
  // Add number of terms to the total.
  const count = searchTerms.length * locations.length;
  totalSearchTerms += count;
  // Headers
  stringifier.write(['Topic:', title]);
  stringifier.write([
    'Total terms generated',
    count,
    '',
    'Total final keywords',
    searchTerms.length,
    '',
    'Sub-terms',
    locations.length,
  ]);
  stringifier.write(['Keywords']);
  stringifier.write(searchTerms);

  locations.forEach((x) => {
    let result = null;
    result = combinations(searchTerms, ['in'], [x]).map((x) => x.join(' '));
    stringifier.write(result);

    return result;
  });
  let stream = fs.createWriteStream(`./output/${title}.csv`);
  stringifier.pipe(stream);
});
console.log(`* Total search terms generated: ${totalSearchTerms}`);
