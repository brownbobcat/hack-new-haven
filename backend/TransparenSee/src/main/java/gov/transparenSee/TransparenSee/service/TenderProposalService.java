package gov.transparenSee.TransparenSee.service;

import gov.transparenSee.TransparenSee.models.TenderProposal;
import gov.transparenSee.TransparenSee.repository.TenderProposalRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class TenderProposalService {
    private final TenderProposalRepository tenderProposalRepository;

    public TenderProposalService(TenderProposalRepository tenderProposalRepository) {
        this.tenderProposalRepository = tenderProposalRepository;
    }

    // Save Proposal as Draft
    public TenderProposal saveProposalDraft(TenderProposal proposal) {
        proposal.setStatus("Draft"); // Mark as draft
        proposal.setAiScore(null); // AI score not needed yet
        return tenderProposalRepository.save(proposal);
    }

    // Finalize and Submit Proposal
    public TenderProposal submitProposal(String proposalId) {
        Optional<TenderProposal> proposalOptional = tenderProposalRepository.findById(proposalId);
        if (proposalOptional.isEmpty()) {
            throw new RuntimeException("Proposal not found");
        }

        TenderProposal proposal = proposalOptional.get();
        if (!"Draft".equals(proposal.getStatus())) {
            throw new RuntimeException("Proposal is already submitted.");
        }

        proposal.setStatus("Pending"); // Mark as officially submitted
        return tenderProposalRepository.save(proposal);
    }
}