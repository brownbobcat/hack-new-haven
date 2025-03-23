package gov.transparenSee.TransparenSee.service;

import gov.transparenSee.TransparenSee.models.Company;
import java.util.Optional;
import java.util.List;

public interface CompanyService {
    Company createCompany(Company company);
    Optional<Company> getCompanyByCode(String companyCode);
    List<Company> getAllCompanies();
}