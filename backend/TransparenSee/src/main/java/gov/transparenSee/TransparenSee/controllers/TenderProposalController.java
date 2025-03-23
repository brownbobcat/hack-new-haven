package gov.transparenSee.TransparenSee.controllers;

import gov.transparenSee.TransparenSee.models.TenderProposal;
import gov.transparenSee.TransparenSee.service.TenderProposalService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tender-proposal")
@CrossOrigin(origins = "http://localhost:3000")
public class TenderProposalController {
    private final TenderProposalService tenderProposalService;

    public TenderProposalController(TenderProposalService tenderProposalService) {
        this.tenderProposalService = tenderProposalService;
    }

    // Save Proposal as Draft
    @PostMapping("/save-draft")
    public TenderProposal saveProposalDraft(@RequestBody TenderProposal proposal) {
        return tenderProposalService.saveProposalDraft(proposal);
    }

    // Finalize and Submit Proposal
    @PutMapping("/submit/{proposalId}")
    public TenderProposal submitProposal(@PathVariable String proposalId) {
        return tenderProposalService.submitProposal(proposalId);
    }
}