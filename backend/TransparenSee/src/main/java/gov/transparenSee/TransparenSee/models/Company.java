package gov.transparenSee.TransparenSee.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "companies")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name = "company_name", unique = true)
    private String companyName;
    @Column(nullable = false, name = "company_address", unique = true)
    private String companyAddress;
    @Column(nullable = false, name = "company_city", unique = true)
    private String companyCity;
    @Column(nullable = false, name = "company_province_or_state", unique = true)
    private String companyStateOrProvince;
    @Column(nullable = false, name = "company_size", unique = true)
    private String companySize;
    @Column(nullable = false, name = "company_code", unique = true)
    private String companyCode;
    @Column(nullable = false, name = "company_email", unique = true)
    private String companyEmail;
    @Column(nullable = false, name = "company_phone", unique = true)
    private String companyPhone;
    @Column(nullable = false, name = "nature_of_business", unique = true)
    private String natureOfBusiness;

}
