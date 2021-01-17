package novi.michellecurfs.eindopdracht.controller;

import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/{username}")
    public ResponseEntity<Object> getUser(@PathVariable("username") String username) {
        return ResponseEntity.ok().body(userService.getUser(username));
    }



    //TODO
    //    public deleteUser(string username){
    //        User currentUser = GetCurrentLoggedInUser();
    //        if(currentUser.username == username || currentUser.role == admin){
    //            return Ok(userService.deleteUser(username));
    //        } else {
    //            return BadRequest("Bruh je hebt geen rechten om dit te doen")
    //        }
    //    }


}
