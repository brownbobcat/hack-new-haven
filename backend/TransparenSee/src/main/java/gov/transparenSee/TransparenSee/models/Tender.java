package gov.transparenSee.TransparenSee.models;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;


import jakarta.persistence.Id;

@Document(collection = "tenders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tender {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String title;
    private String department;
    private String requirements;
    private String status; // "Open", "Closed", "Awarded"
}
