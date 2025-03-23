package gov.transparenSee.TransparenSee.service;

import gov.transparenSee.TransparenSee.models.Tender;
import gov.transparenSee.TransparenSee.repository.TenderRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TenderService {
    private final TenderRepository tenderRepository;

    public TenderService(TenderRepository tenderRepository) {
        this.tenderRepository = tenderRepository;
    }

    public Tender createTender(Tender tender) {
        tender.setExpirationTime(LocalDateTime.now().plusMinutes(2));
        tender.setStatus("Open");
        return tenderRepository.save(tender);
    }

    @Scheduled(fixedRate = 60000)
    public void autoExpireTenders() {
        List<Tender> tenders = tenderRepository.findAll();
        for (Tender tender : tenders) {
            if (LocalDateTime.now().isAfter(tender.getExpirationTime()) && tender.getStatus().equals("Open")) {
                tender.setStatus("Closed");
                tenderRepository.save(tender);
            }
        }
    }
}