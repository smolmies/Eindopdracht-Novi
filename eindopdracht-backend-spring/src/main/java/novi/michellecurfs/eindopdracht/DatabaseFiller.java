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
        user.setUsername("user");
        user.setPassword("useruser");
        user.setRole(rollen);
        authorizationService.registerUser(user);

        SignupRequest admin = new SignupRequest();
        admin.setEmail("admin@admin.nl");
        admin.setUsername("admin");
        admin.setPassword("adminadmin");
        rollen.add("admin");
        admin.setRole(rollen);
        authorizationService.registerUser(admin);

        SignupRequest superuser = new SignupRequest();
        superuser.setEmail("super@user.nl");
        superuser.setUsername("superuser");
        superuser.setPassword("123456");
        rollen.add("admin");
        superuser.setRole(rollen);
        authorizationService.registerUser(superuser);

    }
}
