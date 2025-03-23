package gov.transparenSee.TransparenSee.controllers;

import gov.transparenSee.TransparenSee.models.Company;
import gov.transparenSee.TransparenSee.repository.CompanyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/company")
public class CompanyController {
    private final CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @PostMapping("/register")
    public Company registerCompany(@RequestBody Company company) {
        return new Company(
                company.getId(),
                company.getCompanyName(),
                company.getCompanyAddress(),
                company.getCompanyCity(),
                company.getCompanyStateOrProvince(),
                company.getCompanySize(),
                company.getCompanyCode(),
                company.getCompanyEmail(),
                company.getCompanyPhone(),
                company.getNatureOfBusiness(),
                null // Hide password
        );
    }

    @PostMapping("/login")
    public String login(@RequestParam String companyCode, @RequestParam String password) {
        Optional<Company> company = companyRepository.findByCompanyCode(companyCode);

        if (company.isPresent() && company.get().getPassword().equals(password)) {
            return "Login successful";
        }
        return "Invalid credentials";
    }

    @GetMapping("/companyCode/{companyCode}")
    public Optional<Company> getCompanyByCode(@PathVariable String companyCode) {
        return companyRepository.findByCompanyCode(companyCode);
    }

    @GetMapping("/all")
    public Iterable<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @PostMapping("/generate-sample")
    public List<Company> generateSampleCompanies() {
        List<Company> sampleCompanies = Company.generateSampleCompanies();
        return companyRepository.saveAll(sampleCompanies);
    }

}