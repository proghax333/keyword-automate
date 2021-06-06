
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
