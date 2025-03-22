package gov.transparenSee.TransparenSee.repository;

import gov.transparenSee.TransparenSee.models.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CompanyRepository extends MongoRepository<Company, String> {
    Optional<Company> findByCompanyCode(String companyCode);
}