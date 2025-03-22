package gov.transparenSee.TransparenSee.service;

import gov.transparenSee.TransparenSee.models.Tender;
import java.util.List;

public interface TenderService {
    Tender createTender(Tender tender);
    List<Tender> getAllTenders();
}