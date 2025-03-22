package gov.transparenSee.TransparenSee;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.InsertOneOptions;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

public class CreateNewTender {

    // MongoDB connection details
    private static final String MONGO_URI = "mongodb://localhost:27017";
    private static final String DB_NAME = "tender_management";
    private static final String COLLECTION_NAME = "tenders";

    private static boolean validateInputs(String title, String description, int timeRangeDays, String technicalRequirements, String keyDeliverables) {
        if (title == null || title.trim().isEmpty()) {
            System.out.println("Title is required.");
            return false;
        }
        if (description == null || description.trim().isEmpty()) {
            System.out.println("Description is required.");
            return false;
        }
        if (timeRangeDays <= 0) {
            System.out.println("Time range must be a positive number.");
            return false;
        }
        if (technicalRequirements == null || technicalRequirements.trim().isEmpty()) {
            System.out.println("Technical requirements are required.");
            return false;
        }
        if (keyDeliverables == null || keyDeliverables.trim().isEmpty()) {
            System.out.println("Key deliverables are required.");
            return false;
        }
        return true;
    }

    // Method to generate a unique tender number
    private static String generateTenderNumber() {
        return "TENDER-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    // Method to save tender details to MongoDB
    private static String saveTenderToMongoDB(String tenderNumber, String title, String description, int timeRangeDays, String technicalRequirements, String keyDeliverables) {
        try (MongoClient mongoClient = MongoClients.create(MONGO_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<org.bson.Document> collection = database.getCollection(COLLECTION_NAME);

            // Create a MongoDB document
            org.bson.Document tenderDocument = new org.bson.Document()
                    .append("tenderNumber", tenderNumber)
                    .append("title", title)
                    .append("description", description)
                    .append("timeRangeDays", timeRangeDays)
                    .append("technicalRequirements", technicalRequirements)
                    .append("keyDeliverables", keyDeliverables);

            // Insert the document into the collection
            collection.insertOne(tenderDocument, new InsertOneOptions());

            return "Tender saved successfully with number: " + tenderNumber;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error saving tender to MongoDB.";
        }
    }

    // Method to generate a PDF document
    private static void generatePdf(String tenderNumber, String title, String description, int timeRangeDays, String technicalRequirements, String keyDeliverables, String filePath) {
        try (PdfWriter writer = new PdfWriter(filePath);
             PdfDocument pdf = new PdfDocument(writer);
             Document document = new Document(pdf)) {

            document.add(new Paragraph("Tender Document"));
            document.add(new Paragraph("Tender Number: " + tenderNumber));
            document.add(new Paragraph("Title: " + title));
            document.add(new Paragraph("Description: " + description));
            document.add(new Paragraph("Time Range (Days): " + timeRangeDays));
            document.add(new Paragraph("Technical Requirements: " + technicalRequirements));
            document.add(new Paragraph("Key Deliverables: " + keyDeliverables));

            System.out.println("PDF generated successfully at: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // Example inputs (can be replaced with user input or form data)
        String title = "Construction of a New Office Building";
        String description = "This tender is for the construction of a new office building in the city center.";
        int timeRangeDays = 180;
        String technicalRequirements = "The contractor must have a valid license and at least 5 years of experience.";
        String keyDeliverables = "Completed building with all utilities installed.";

        // Validate inputs
        if (!validateInputs(title, description, timeRangeDays, technicalRequirements, keyDeliverables)) {
            System.out.println("Validation failed. Please check your inputs.");
            return;
        }

        // Generate tender number
        String tenderNumber = generateTenderNumber();

        // Save tender to MongoDB
        String saveResult = saveTenderToMongoDB(tenderNumber, title, description, timeRangeDays, technicalRequirements, keyDeliverables);
        System.out.println(saveResult);

        // Generate PDF
        String pdfFilePath = "TenderDocument_" + tenderNumber + ".pdf";
        generatePdf(tenderNumber, title, description, timeRangeDays, technicalRequirements, keyDeliverables, pdfFilePath);

        // Display result on webpage (simulated)
        System.out.println("Tender Document Number: " + tenderNumber);
        System.out.println("PDF document is ready for download at: " + pdfFilePath);
    }
}
