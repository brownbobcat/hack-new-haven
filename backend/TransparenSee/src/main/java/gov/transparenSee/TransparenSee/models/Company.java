package gov.transparenSee.TransparenSee.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "companies")
public class Company {
    @Id
    private String id;
    private String companyName;
    private String companyAddress;
    private String companyCity;
    private String companyStateOrProvince;
    private String companySize;
    private String companyCode;
    private String companyEmail;
    private String companyPhone;
    private String natureOfBusiness;
    private String password;

}
