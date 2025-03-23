package gov.transparenSee.TransparenSee.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tenders")
public class Tender {
    @Id
    private String id;
    private String title;
    private String description;
    private double minBudget;
    private double maxBudget;
    private String minTimeline;
    private String maxTimeline;
    private LocalDateTime expirationTime;
    private String status;
}