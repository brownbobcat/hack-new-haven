package gov.transparenSee.TransparenSee.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "government_officials")
public class GovernmentOfficial {
    @Id
    private String id;
    private String fullName;
    private String email;
    private String department;
    private String password;
}