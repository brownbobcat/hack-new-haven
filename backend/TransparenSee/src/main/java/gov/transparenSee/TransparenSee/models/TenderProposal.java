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
    private String tenderId;  // The ID of the tender being applied for
    private String companyCode; // The company applying
    private String proposalFilename; // The stored filename of the PDF proposal
    private String status; // "Pending", "Reviewed", "Awarded"
}