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
public class LoginController {

//    @PostMapping(value = "/login")
//    public ResponseEntity<Object> checkLogin(@RequestBody User user){
//        //TODO
//        // Go to login service (or user service) and get the username from db, Hash entered password and compare
//        // The password in the DB with the entered password, and then return if ok or not ok
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }


}
