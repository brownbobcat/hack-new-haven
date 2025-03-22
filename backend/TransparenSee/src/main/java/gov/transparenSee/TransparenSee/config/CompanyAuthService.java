package gov.transparenSee.TransparenSee.config;

import gov.transparenSee.TransparenSee.models.Company;
import gov.transparenSee.TransparenSee.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CompanyAuthService {
    private final CompanyRepository companyRepository;

    public CompanyAuthService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Optional<Company> authenticate(String companyCode, String password) {
        Optional<Company> company = companyRepository.findByCompanyCode(companyCode);
        return company.filter(c -> c.getPassword().equals(password));
    }
}