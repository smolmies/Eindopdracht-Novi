package novi.michellecurfs.eindopdracht.controllers;

import novi.michellecurfs.eindopdracht.model.Register;
import novi.michellecurfs.eindopdracht.model.login;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {

    @PostMapping(value = "/login")
    public ResponseEntity<Object> checkLogin(@RequestBody login Login){
        //TODO
        // Go to login service (or user service whatever you want to name this) and get the username from db, Hash entered password and compare
        // The password in the DB with the entered password, and then return if ok or not ok :D
        return new ResponseEntity<>(Login, HttpStatus.OK);
    }

    @PostMapping(value ="/register")
    public ResponseEntity<Object> registerAccount(@RequestBody Register register){
        //TODO
        // Go to register Service to register account (Check if account exist yadda yadda. Hash password and then yeet it into the DB
        // Return if registration was successfull or not
        return new ResponseEntity<>(register,HttpStatus.OK);
    }


}
