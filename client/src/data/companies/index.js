import tcs from './tcs';
import infosys from './infosys';
import wipro from './wipro';
import cognizant from './cognizant';
import accenture from './accenture';
import hcl from './hcl';
import techMahindra from './tech-mahindra';
import amazon from './amazon';
import microsoft from './microsoft';
import google from './google';
import ibm from './ibm';
import oracle from './oracle';
import deloitte from './deloitte';
import capgemini from './capgemini';

export const defaultCompanies = [
  tcs,
  infosys,
  wipro,
  cognizant,
  accenture,
  hcl,
  techMahindra,
  amazon,
  microsoft,
  google,
  ibm,
  oracle,
  deloitte,
  capgemini,
];

export const companyLookup = defaultCompanies.reduce((map, company) => {
  map[company.id] = company;
  return map;
}, {});
