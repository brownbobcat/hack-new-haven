package gov.transparenSee.TransparenSee.service.impl;

import gov.transparenSee.TransparenSee.models.Tender;
import gov.transparenSee.TransparenSee.repository.TenderRepository;
import gov.transparenSee.TransparenSee.service.TenderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TenderServiceImpl implements TenderService {
    private final TenderRepository tenderRepository;

    public TenderServiceImpl(TenderRepository tenderRepository) {
        this.tenderRepository = tenderRepository;
    }

    @Override
    public Tender createTender(Tender tender) {
        return tenderRepository.save(tender);
    }

    @Override
    public List<Tender> getAllTenders() {
        return tenderRepository.findAll();
    }
}