import { Company } from '../types';
import ruCompanies from './ru.json';
import usCompanies from './us.json';

export const searchForCompany = async (query: string) => {
    query = query.trim().toLowerCase().slice(0, 25);

    const companies = filterCompanies(ruCompanies, query).concat(
        filterCompanies(usCompanies, query)
    );

    return companies;
};

export const filterCompanies = (companies: Company[], query: string) => {
    return companies.filter(
        ({ t, n }) =>
            t.toLowerCase().includes(query) ||
            n.toLowerCase().includes(query)
    );
};
