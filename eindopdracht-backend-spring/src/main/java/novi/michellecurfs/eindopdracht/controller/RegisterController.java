package novi.michellecurfs.eindopdracht.controller;

import novi.michellecurfs.eindopdracht.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RegisterController {

    @PostMapping(value ="/register")
    public ResponseEntity<Object> registerAccount(@RequestBody User user){
        //TODO
        // Go to register Service to register account (Check if account exist yadda yadda. Hash password and then yeet it into the DB
        // Return if registration was successfull or not
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
