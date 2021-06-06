
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
const prefixes = [undefined, 'Top', 'Best', 'No.1', 'Top 10'];
const suffixes = [
  'Services',
  'Consultant',
  'Consultancy',
  'Consulting Services',
  'Consulting Companies',
  'Consulting Firms',
  'Company',
  'Service Provider',
  'Consulting',
  'Companies',
  'Firms',
  'Assessment firm',
  'Assessment company',
  'Assessment service',
  'Solutions',
  'Solutions company'
];

let topics = [
  createTerm('Cyber Security', {
    prefixes: [...prefixes],
    suffixes: [...suffixes],
    exact: [],
  }),
  createTerm('CERT-IN Cyber Security Audit', {
    prefixes: [...prefixes],
    suffixes: [...suffixes, 'vendors'],
    exact: [],
  }),
  createTerm('ISO Compliance', {
    prefixes: [...prefixes],
    suffixes: [...suffixes, 'vendors'],
    exact: [],
  }),
  createTerm('PCI DSS Compliance', {
    prefixes: [...prefixes],
    suffixes: [...suffixes, 'vendors'],
    exact: [],
  }),
  createTerm('SOC Compliance', {
    terms: ['SOC Compliance audit'],
    prefixes: [...prefixes],
    suffixes: [...suffixes, 'vendors'],
    exact: [],
  }),
  createTerm('HIPAA Compliance', {
    terms: ['HIPAA Compliance audit'],
    prefixes: [...prefixes],
    suffixes: [...suffixes, 'vendors'],
    exact: ['hipaa compliance officer'],
  }),
  createTerm('GDPR Compliance', {
    terms: ['GDPR Compliance audit'],
    prefixes: [...prefixes],
    suffixes: [...suffixes, 'vendors', 'dashboard'],
    exact: ['gdpr compliance officer'],
  }),
  createTerm('FISMA Compliance', {
    terms: ['FISMA Compliance audit'],
    prefixes: [...prefixes],
    suffixes: [...suffixes, 'vendors'],
    exact: [],
  }),
  createTerm('GRC Compliance', {
    terms: ['governance risk and compliance'],
    prefixes: [...prefixes],
    suffixes: [...suffixes, 'vendors'],
    exact: [],
  }),
];

const baseTerms = topics.map(term => {
  return generateSearchTerms(term);
});

let totalSearchTerms = 0;
baseTerms.forEach(term => {
  const title = term.title;
  const searchTerms = term.terms;
  const stringifier = stringify({
    delimiter: ',',
    header: true,
    columns: searchTerms
  })
  totalSearchTerms += searchTerms.length * locations.length;
  
  locations.forEach(x => {
    let result = null;
    result = combinations(searchTerms, ["in"], [x]).map(x => x.join(' '));
    stringifier.write(result);

    return result;
  });
  let stream = fs.createWriteStream(`./output/${title}.csv`);
  stringifier.pipe(stream);
})
console.log(totalSearchTerms);
