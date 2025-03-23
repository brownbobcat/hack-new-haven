package gov.transparenSee.TransparenSee.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "tenders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tender {
    @Id
    private String id;
    private String title;
    private String department;
    private String requirements;
    private String status; // "Open", "Closed", "Awarded"
}
