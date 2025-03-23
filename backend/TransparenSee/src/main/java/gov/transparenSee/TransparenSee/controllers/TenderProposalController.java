package gov.transparenSee.TransparenSee.controllers;

import gov.transparenSee.TransparenSee.models.TenderProposal;
import gov.transparenSee.TransparenSee.service.TenderProposalService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tender-proposal")
public class TenderProposalController {
    private final TenderProposalService tenderProposalService;

    public TenderProposalController(TenderProposalService tenderProposalService) {
        this.tenderProposalService = tenderProposalService;
    }

    @PostMapping("/submit/{tenderId}")
    public TenderProposal submitProposal(@PathVariable String tenderId,
                                         @RequestParam String companyCode,
                                         @RequestParam("file") MultipartFile proposalFile) throws IOException {
        return tenderProposalService.submitProposal(tenderId, companyCode, proposalFile);
    }

    @GetMapping("/tender/{tenderId}")
    public List<TenderProposal> getProposalsByTender(@PathVariable String tenderId) {
        return tenderProposalService.getProposalsByTender(tenderId);
    }

    @GetMapping("/company/{companyCode}")
    public List<TenderProposal> getProposalsByCompany(@PathVariable String companyCode) {
        return tenderProposalService.getProposalsByCompany(companyCode);
    }

    @GetMapping("/{proposalId}")
    public Optional<TenderProposal> getProposalById(@PathVariable String proposalId) {
        return tenderProposalService.getProposalById(proposalId);
    }
}