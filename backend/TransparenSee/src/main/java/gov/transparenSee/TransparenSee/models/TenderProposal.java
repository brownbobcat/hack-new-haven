package gov.transparenSee.TransparenSee.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tender_proposals")
public class TenderProposal {
    @Id
    private String id;
    private String tenderId;
    private String companyName;
    private String proposalTitle;
    private String proposalContent;
    private double budget;
    private String timeline;
    private String status;
    private Integer aiScore;
}
