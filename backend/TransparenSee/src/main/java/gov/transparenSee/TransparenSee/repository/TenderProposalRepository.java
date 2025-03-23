package gov.transparenSee.TransparenSee.repository;

import gov.transparenSee.TransparenSee.models.TenderProposal;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TenderProposalRepository extends MongoRepository<TenderProposal, String> {
    List<TenderProposal> findByTenderId(String tenderId);
    List<TenderProposal> findByCompanyName(String companyName);
}