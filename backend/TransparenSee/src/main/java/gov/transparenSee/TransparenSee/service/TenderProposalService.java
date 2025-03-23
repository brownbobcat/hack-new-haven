package gov.transparenSee.TransparenSee.service;

import gov.transparenSee.TransparenSee.models.TenderProposal;
import gov.transparenSee.TransparenSee.repository.TenderProposalRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TenderProposalService {
    private final TenderProposalRepository tenderProposalRepository;

    public TenderProposalService(TenderProposalRepository tenderProposalRepository) {
        this.tenderProposalRepository = tenderProposalRepository;
    }

    public TenderProposal submitProposal(TenderProposal proposal) {
        proposal.setStatus("Pending");
        proposal.setAiScore(null);
        return tenderProposalRepository.save(proposal);
    }

    public TenderProposal updateProposalScore(String proposalId, int aiScore) {
        Optional<TenderProposal> proposalOptional = tenderProposalRepository.findById(proposalId);
        if (proposalOptional.isEmpty()) {
            throw new RuntimeException("Proposal not found");
        }

        TenderProposal proposal = proposalOptional.get();
        proposal.setAiScore(aiScore);
        proposal.setStatus("Evaluated");
        return tenderProposalRepository.save(proposal);
    }
}
