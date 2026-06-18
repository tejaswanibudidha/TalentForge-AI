import tcs from './tcs';
import infosys from './infosys';
import wipro from './wipro';
import cognizant from './cognizant';
import accenture from './accenture';

export const defaultCompanies = [
  tcs,
  infosys,
  wipro,
  cognizant,
  accenture,
];

export const companyLookup = defaultCompanies.reduce((map, company) => {
  map[company.id] = company;
  return map;
}, {});
