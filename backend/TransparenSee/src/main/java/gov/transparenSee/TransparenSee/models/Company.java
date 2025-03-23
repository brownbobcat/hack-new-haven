package gov.transparenSee.TransparenSee.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    // Static method to generate 20 sample companies
    public static List<Company> generateSampleCompanies() {
        List<Company> companies = new ArrayList<>();
        String[] businessTypes = {"Construction", "IT Services", "Agriculture", "Healthcare", "Energy"};

        for (int i = 1; i <= 20; i++) {
            String businessType = businessTypes[i % businessTypes.length]; // Cycle through business types
            companies.add(new Company(
                    UUID.randomUUID().toString(),  // Unique ID
                    "Company " + i,
                    i + " Main Street",
                    "Harare",
                    "Harare",
                    i % 2 == 0 ? "Large" : "Small",  // Alternate between Large & Small
                    "COMP" + i,  // Unique company code
                    "company" + i + "@test.com",
                    "+263 77" + (1000000 + i),  // Generate phone numbers
                    businessType,
                    "password" + i  // Sample passwords
            ));
        }
        return companies;
    }

}
