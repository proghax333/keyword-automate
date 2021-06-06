
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
    exact: [],
  }),
  createTerm('CERT-IN Cyber Security Audit', {
    exact: [],
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
    exact: ['hipaa compliance officer'],
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

const baseTerms = topics.map(term => {
  return generateSearchTerms(term);
});

let totalSearchTerms = 0;
baseTerms.forEach(term => {
  const title = term.title;
  const searchTerms = term.terms;
  const stringifier = stringify({
    delimiter: ','
  });
  // Add number of terms to the total.
  const count = searchTerms.length * locations.length;
  totalSearchTerms += count;
  // Headers
  stringifier.write(["Topic:", title]);
  stringifier.write(["Total terms generated", count, "", "Total final keywords", searchTerms.length, "", "Sub-terms", locations.length]);
  stringifier.write(["Keywords"]);
  stringifier.write(searchTerms);
  
  locations.forEach(x => {
    let result = null;
    result = combinations(searchTerms, ["in"], [x]).map(x => x.join(' '));
    stringifier.write(result);

    return result;
  });
  let stream = fs.createWriteStream(`./output/${title}.csv`);
  stringifier.pipe(stream);
})
console.log(`* Total search terms generated: ${totalSearchTerms}`);
