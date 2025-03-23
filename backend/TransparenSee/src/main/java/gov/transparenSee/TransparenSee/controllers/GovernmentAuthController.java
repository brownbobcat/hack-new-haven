package gov.transparenSee.TransparenSee.controllers;

import gov.transparenSee.TransparenSee.config.GovernmentAuthService;
import gov.transparenSee.TransparenSee.models.GovernmentOfficial;
import gov.transparenSee.TransparenSee.repository.GovernmentOfficialRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/government")
public class GovernmentAuthController {
    private final GovernmentAuthService governmentAuthService;
    private final GovernmentOfficialRepository governmentOfficialRepository;

    public GovernmentAuthController(GovernmentAuthService governmentAuthService, GovernmentOfficialRepository governmentOfficialRepository) {
        this.governmentAuthService = governmentAuthService;
        this.governmentOfficialRepository = governmentOfficialRepository;
    }

    @PostMapping("/register")
    public GovernmentOfficial registerOfficial(@RequestBody GovernmentOfficial official) {
        return governmentOfficialRepository.save(official);
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        Optional<GovernmentOfficial> official = governmentAuthService.authenticate(email, password);

        if (official.isPresent()) {
            return "Login successful";
        }
        return "Invalid credentials";
    }

    @GetMapping("/{email}")
    public Optional<GovernmentOfficial> getOfficialByEmail(@PathVariable String email) {
        Optional<GovernmentOfficial> official = governmentOfficialRepository.findByEmail(email);

        if (official.isPresent()) {
            GovernmentOfficial sanitizedOfficial = official.get();
            sanitizedOfficial.setPassword(null);
            return Optional.of(sanitizedOfficial);
        }
        return Optional.empty();
    }

    @GetMapping("/all")
    public Iterable<GovernmentOfficial> getAllOfficials() {
        Iterable<GovernmentOfficial> officials = governmentOfficialRepository.findAll();
        officials.forEach(official -> official.setPassword(null));
        return officials;
    }
}