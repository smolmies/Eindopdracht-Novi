package novi.michellecurfs.eindopdracht;

import novi.michellecurfs.eindopdracht.payload.request.SignupRequest;
import novi.michellecurfs.eindopdracht.service.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DatabaseFiller implements CommandLineRunner {

    private final AuthorizationService authorizationService;

    @Autowired
    public DatabaseFiller(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

    @Override
    public void run(String... args) {

        Set<String> rollen = new HashSet<>();
        rollen.add("user");

        SignupRequest user = new SignupRequest();
        user.setEmail("user@user.nl");
        user.setPhoneNumber("0612345678");
        user.setUsername("user");
        user.setPassword("useruser");
        user.setRole(rollen);
        authorizationService.registerUser(user);

        SignupRequest admin = new SignupRequest();
        admin.setEmail("admin@admin.nl");
        admin.setPhoneNumber("0623456789");
        admin.setUsername("admin");
        admin.setPassword("adminadmin");
        rollen.add("admin");
        admin.setRole(rollen);
        authorizationService.registerUser(admin);

        SignupRequest superuser = new SignupRequest();
        superuser.setEmail("super@user.nl");
        superuser.setPhoneNumber("0634567890");
        superuser.setUsername("superuser");
        superuser.setPassword("123456");
        rollen.add("admin");
        superuser.setRole(rollen);
        authorizationService.registerUser(superuser);

    }
}
