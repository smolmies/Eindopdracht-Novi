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
        user.setPassword("Useruser!");
        user.setRole(rollen);
        authorizationService.registerUser(user);

        SignupRequest anotheruser = new SignupRequest();
        anotheruser.setEmail("another@user.nl");
        anotheruser.setPhoneNumber("0634567890");
        anotheruser.setUsername("anotheruser");
        anotheruser.setPassword("Anotheruser!");
        anotheruser.setRole(rollen);
        authorizationService.registerUser(anotheruser);

        SignupRequest admin = new SignupRequest();
        admin.setEmail("admin@admin.nl");
        admin.setPhoneNumber("0623456789");
        admin.setUsername("admin");
        admin.setPassword("Adminadmin!");
        rollen.add("admin");
        admin.setRole(rollen);
        authorizationService.registerUser(admin);

    }
}
