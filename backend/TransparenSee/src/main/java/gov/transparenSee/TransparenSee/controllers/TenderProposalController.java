package gov.transparenSee.TransparenSee.controllers;

import gov.transparenSee.TransparenSee.models.TenderProposal;
import gov.transparenSee.TransparenSee.service.TenderProposalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/tender-proposal")
@CrossOrigin(origins = "http://localhost:3000")
public class TenderProposalController {
    private final TenderProposalService tenderProposalService;

    public TenderProposalController(TenderProposalService tenderProposalService) {
        this.tenderProposalService = tenderProposalService;
    }

    @PostMapping("/submit")
    public TenderProposal submitProposal(@RequestBody TenderProposal proposal) {
        return tenderProposalService.submitProposal(proposal);
    }

    @PutMapping("/update-score/{proposalId}")
    public TenderProposal updateProposalScore(@PathVariable String proposalId, @RequestParam int aiScore) {
        return tenderProposalService.updateProposalScore(proposalId, aiScore);
    }
}
