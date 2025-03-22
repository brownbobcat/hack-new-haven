package gov.transparenSee.TransparenSee.repository;

import gov.transparenSee.TransparenSee.models.GovernmentOfficial;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface GovernmentOfficialRepository extends MongoRepository<GovernmentOfficial, String> {
    Optional<GovernmentOfficial> findByEmail(String email);
}