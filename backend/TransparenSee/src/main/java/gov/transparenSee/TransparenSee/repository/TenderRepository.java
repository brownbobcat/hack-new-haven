package gov.transparenSee.TransparenSee.repository;

import gov.transparenSee.TransparenSee.models.Tender;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TenderRepository extends MongoRepository<Tender, String> {
}
