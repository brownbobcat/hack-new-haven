package gov.transparenSee.TransparenSee.service.impl;

import gov.transparenSee.TransparenSee.models.Company;
import gov.transparenSee.TransparenSee.repository.CompanyRepository;
import gov.transparenSee.TransparenSee.service.CompanyService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public Optional<Company> getCompanyByCode(String companyCode) {
        return companyRepository.findByCompanyCode(companyCode);
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
}