import java.util.Scanner;

public class CustomerVerification {

    public enum Region {
        NORTH, SOUTH, EAST, WEST, CENTRAL
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

    // Class to represent the company details
    public static class Company {
        private String name;
        private Region location;
        private FieldOfOperation fieldOfOperation;
        private CompanySize size;
        private int yearsOfExperience;

        public Company(String name, Region location, FieldOfOperation fieldOfOperation, CompanySize size, int yearsOfExperience) {
            this.name = name;
            this.location = location;
            this.fieldOfOperation = fieldOfOperation;
            this.size = size;
            this.yearsOfExperience = yearsOfExperience;
        }

        public String getName() {
            return name;
        }

        public Region getLocation() {
            return location;
        }

        public FieldOfOperation getFieldOfOperation() {
            return fieldOfOperation;
        }

        public CompanySize getSize() {
            return size;
        }

        public int getYearsOfExperience() {
            return yearsOfExperience;
        }
    }

    // Method to verify if the company is eligible for the tender
    public static boolean verifyCompany(Company company, Region tenderRegion, FieldOfOperation tenderField, int requiredManpower, int requiredExperience) {
        // Check if the company is in the same region as the tender
        if (!company.getLocation().equals(tenderRegion)) {
            System.out.println("Company is not in the same region as the tender.");
            return false;
        }

        // Check if the company operates in the same field as the tender
        if (!company.getFieldOfOperation().equals(tenderField)) {
            System.out.println("Company does not operate in the same field as the tender.");
            return false;
        }

        // Check if the company has the required manpower based on its size
        if (company.getSize().getManpower() < requiredManpower) {
            System.out.println("Company does not have the required manpower to complete the tasks.");
            return false;
        }

        // Check if the company has the required years of experience
        if (company.getYearsOfExperience() < requiredExperience) {
            System.out.println("Company does not meet the required years of experience.");
            return false;
        }

        // If all checks pass, the company is eligible
        System.out.println("Company is eligible for the tender.");
        return true;
    }

    // Helper method to get user input for enum values
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
                scanner.next(); // Clear invalid input
            }
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input for company details
        System.out.println("Enter company name:");
        String companyName = scanner.nextLine();

        Region companyRegion = getEnumInput(scanner, Region.class, "Select company region:");
        FieldOfOperation companyField = getEnumInput(scanner, FieldOfOperation.class, "Select company field of operation:");
        CompanySize companySize = getEnumInput(scanner, CompanySize.class, "Select company size:");

        System.out.println("Enter years of experience:");
        int yearsOfExperience = scanner.nextInt();

        // Create company object
        Company company = new Company(companyName, companyRegion, companyField, companySize, yearsOfExperience);

        // Input for tender details
        Region tenderRegion = getEnumInput(scanner, Region.class, "Select tender region:");
        FieldOfOperation tenderField = getEnumInput(scanner, FieldOfOperation.class, "Select tender field of operation:");

        System.out.println("Enter required manpower:");
        int requiredManpower = scanner.nextInt();

        System.out.println("Enter required years of experience:");
        int requiredExperience = scanner.nextInt();

        // Verify company eligibility
        boolean isEligible = verifyCompany(company, tenderRegion, tenderField, requiredManpower, requiredExperience);
        System.out.println("Eligibility Status: " + isEligible);

        scanner.close();
    }
}