package gov.transparenSee.TransparenSee.service;

import gov.transparenSee.TransparenSee.models.TenderProposal;
import gov.transparenSee.TransparenSee.repository.TenderProposalRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class TenderProposalService {
    private final TenderProposalRepository tenderProposalRepository;
    private final String UPLOAD_DIR = "uploads/"; // Directory to store PDFs

    public TenderProposalService(TenderProposalRepository tenderProposalRepository) {
        this.tenderProposalRepository = tenderProposalRepository;
    }

    public TenderProposal submitProposal(String tenderId, String companyCode, MultipartFile proposalFile) throws IOException {
        // Ensure the upload directory exists
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) uploadDir.mkdirs();

        // Save the file to the local filesystem
        String filePath = UPLOAD_DIR + proposalFile.getOriginalFilename();
        proposalFile.transferTo(new File(filePath));

        // Create and save the proposal entry
        TenderProposal proposal = new TenderProposal(null, tenderId, companyCode, proposalFile.getOriginalFilename(), "Pending");
        return tenderProposalRepository.save(proposal);
    }

    public List<TenderProposal> getProposalsByTender(String tenderId) {
        return tenderProposalRepository.findByTenderId(tenderId);
    }

    public List<TenderProposal> getProposalsByCompany(String companyCode) {
        return tenderProposalRepository.findByCompanyCode(companyCode);
    }

    public Optional<TenderProposal> getProposalById(String proposalId) {
        return tenderProposalRepository.findById(proposalId);
    }
}