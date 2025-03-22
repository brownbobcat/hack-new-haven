package gov.transparenSee.TransparenSee.config;

import gov.transparenSee.TransparenSee.models.GovernmentOfficial;
import gov.transparenSee.TransparenSee.repository.GovernmentOfficialRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class GovernmentAuthService {
    private final GovernmentOfficialRepository governmentOfficialRepository;

    public GovernmentAuthService(GovernmentOfficialRepository governmentOfficialRepository) {
        this.governmentOfficialRepository = governmentOfficialRepository;
    }

    public Optional<GovernmentOfficial> authenticate(String email, String password) {
        Optional<GovernmentOfficial> official = governmentOfficialRepository.findByEmail(email);
        return official.filter(o -> o.getPassword().equals(password));
    }
}