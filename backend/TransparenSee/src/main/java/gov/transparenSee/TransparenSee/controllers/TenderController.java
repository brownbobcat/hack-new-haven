package gov.transparenSee.TransparenSee.controllers;

import gov.transparenSee.TransparenSee.models.Tender;
import gov.transparenSee.TransparenSee.service.TenderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tender")
@CrossOrigin(origins = "http://localhost:3000")
public class TenderController {
    private final TenderService tenderService;

    public TenderController(TenderService tenderService) {
        this.tenderService = tenderService;
    }

    @PostMapping("/create")
    public Tender createTender(@RequestBody Tender tender) {
        return tenderService.createTender(tender);
    }

    @GetMapping("/all")
    public List<Tender> getAllTenders() {
        return tenderService.getAllTenders();
    }
}
