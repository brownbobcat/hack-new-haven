package gov.transparenSee.TransparenSee;

import gov.transparenSee.TransparenSee.models.Company;
import java.util.Scanner;

public class CustomerVerification {

    public enum Region {
        NORTH, NORTHWEST, NORTHEAST, SOUTHWEST, SOUTHEAST, SOUTH, EAST, WEST, CENTRAL
    }

    public enum FieldOfOperation {
        CONSTRUCTION, IT, HEALTHCARE, EDUCATION, TRANSPORTATION, ENERGY
    }

    public enum CompanySize {
        SMALL(50), MEDIUM(200), LARGE(1000);

        private final int manpower;

        CompanySize(int manpower) {
            this.manpower = manpower;
        }

        public int getManpower() {
            return manpower;
        }
    }
    public static boolean verifyCompany(Company company, Region tenderRegion, FieldOfOperation tenderField, int requiredManpower, int requiredExperience) {
        if (!company.getCompanyStateOrProvince().equalsIgnoreCase(tenderRegion.name())) {
            System.out.println("Company is not in the same region as the tender.");
            return false;
        }

        if (!company.getNatureOfBusiness().equalsIgnoreCase(tenderField.name())) {
            System.out.println("Company does not operate in the same field as the tender.");
            return false;
        }

        CompanySize companySize = CompanySize.valueOf(company.getCompanySize().toUpperCase());
        if (companySize.getManpower() < requiredManpower) {
            System.out.println("Company does not have the required manpower to complete the tasks.");
            return false;
        }

        if (company.getYearsOfOperation() < requiredExperience) {
            System.out.println("Company does not meet the required years of experience.");
            return false;
        }

        System.out.println("Company is eligible for the tender.");
        return true;
    }

    public static <T extends Enum<T>> T getEnumInput(Scanner scanner, Class<T> enumType, String prompt) {
        while (true) {
            System.out.println(prompt);
            for (T value : enumType.getEnumConstants()) {
                System.out.println((value.ordinal() + 1) + ". " + value);
            }
            try {
                int choice = scanner.nextInt();
                if (choice > 0 && choice <= enumType.getEnumConstants().length) {
                    return enumType.getEnumConstants()[choice - 1];
                } else {
                    System.out.println("Invalid choice. Please try again.");
                }
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a number.");
                scanner.next();
            }
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter company name:");
        String companyName = scanner.nextLine();

        System.out.println("Enter company state or province:");
        String companyStateOrProvince = scanner.nextLine();

        System.out.println("Enter nature of business:");
        String natureOfBusiness = scanner.nextLine();

        System.out.println("Enter company size (number of employees):");
        int companySizeValue = scanner.nextInt();
        scanner.nextLine(); // Consume the newline character

        String companySize;
        if (companySizeValue >= 0 && companySizeValue <= 50) {
            companySize = "SMALL";
        } else if (companySizeValue >= 51 && companySizeValue <= 200) {
            companySize = "MEDIUM";
        } else if (companySizeValue > 200) {
            companySize = "LARGE";
        } else {
            System.out.println("Invalid company size. Defaulting to SMALL.");
            companySize = "SMALL";
        }

        System.out.println("Enter the number of years the company has been in operation:");
        int yearsOfOperation = scanner.nextInt();
        scanner.nextLine(); // Consume the newline character

        Company company = new Company();
        company.setCompanyName(companyName);
        company.setCompanyStateOrProvince(companyStateOrProvince);
        company.setNatureOfBusiness(natureOfBusiness);
        company.setCompanySize(companySize);
        company.setYearsOfOperation(yearsOfOperation); // Set years of operation

        Region tenderRegion = getEnumInput(scanner, Region.class, "Select tender region:");
        FieldOfOperation tenderField = getEnumInput(scanner, FieldOfOperation.class, "Select tender field of operation:");

        System.out.println("Enter required manpower:");
        int requiredManpower = scanner.nextInt();

        System.out.println("Enter required years of experience:");
        int requiredExperience = scanner.nextInt();

        boolean isEligible = verifyCompany(company, tenderRegion, tenderField, requiredManpower, requiredExperience);
        System.out.println("Eligibility Status: " + isEligible);

        scanner.close();
    }
}