const { createTerm, generateSearchTerms } = require('./terms');
const { combinations } = require('./cartesian');
const stringify = require('csv-stringify');
const fs = require('fs');

const locations = [
  'India',
  'Bhubaneshwar',
  'Odisha',
  'Kolkata, West Bengal',
  'VISAK, Andhra Pradesh',
  'Chennai, Tamilnadu',
  'Hyderabad, Telengana',
  'Delhi',
  'Ahmedabad, Gujurat',
  'Pune, Maharashtra',
  'Bangalore, Karnataka',
  'Mumbai, Maharastra',
  'Warangal, Andhra Pradesh',
  'Luchknow, Uttar Pradesh',
  'Thiruanantapuram, Kerla',
  'Qatar',
  'Africa',
  'South Africa',
  'Kenya',
  'Nigeria',
  'Dubai',
  'Bahrain',
  'Abu Dhabi',
  'Bangladesh',
  'Ireland',
  'Europe',
  'Canada',
  'USA',
  'UK',
  'UAE',
  'Singapore',
  'Malaysia',
  'Indonesia',
  'Vietnam',
  'Australia',
  'Estonia',
  'Saudi',
  'Mauritius',
  'Tanzania',
  'France',
  'Spain',
  'Italy',
  'Kuwait',
  'Afganisthan',
  'North East',
  'Chandigarh',
];

let topics = [
  createTerm('Cyber Security', {
    exact: [
      'cyber security audit company',
      'cyber security testing company',
      'cyber security firm',
      'top cyber security firm',
      'best cyber securit company',
      'top 10 cyber security companies',
      'cyber security service providers',
      'cyber security consultancy',
      'cyber security consulting company',
      'cyber security consulting firm',
      'biggest cyber security company',
      'biggest cyber security firm',
      'cyber security auditing services',
      'cyber security assessment company',
      'cyber security companies',
      'cyber security providers',
      'top cyber security audit firm',
      'best cyber security testing company',
      'top 10 biggest cyber security consulting companies',
      'No.1 cyber security assessment firm',
    ],
  }),
  createTerm('CERT-IN Cyber Security Audit', {
    exact: [
      'CERT-IN Cyber Security Audit company',
      'CERT-IN Cyber Security Audit testing company',
      'CERT-IN Cyber Security Audit firm',
      'top CERT-IN Cyber Security Audit firm',
      'best CERT-IN Cyber Security company',
      'top 10 CERT-IN Cyber Security Audit companies',
      'CERT-IN Cyber Security Audit service providers',
      'CERT-IN Cyber Security consultancy',
      'CERT-IN Cyber Security consulting company',
      'CERT-IN Cyber Security Audit consulting firm',
      'biggest CERT-IN Cyber Security Audit company',
      'largest CERT-IN Cyber Security Audit firm',
      'CERT-IN Cyber Security Audit auditing services',
      'CERT-IN Cyber Security assessment company',
      'CERT-IN Cyber Security Audit companies',
      'CERT-IN Cyber Security Audit providers',
      'top CERT-IN Cyber Security Audit firm',
      'best CERT-IN Cyber Security Audit testing company',
      'top 10 biggest CERT-IN Cyber Security Audit consulting companies',
      'No.1 CERT-IN Cyber Security assessment firm',
    ],
  }),
  createTerm('ISO Compliance', {
    exact: [],
  }),
  createTerm('PCI DSS Compliance', {
    exact: [],
  }),
  createTerm('SOC Compliance', {
    exact: [],
  }),
  createTerm('HIPAA Compliance', {
    exact: [''],
  }),
  createTerm('GDPR Compliance', {
    exact: ['gdpr compliance officer'],
  }),
  createTerm('FISMA Compliance', {
    exact: [],
  }),
  createTerm('GRC Compliance', {
    exact: [],
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
