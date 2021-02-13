package novi.michellecurfs.eindopdracht.controller;

import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

//    @GetMapping(value = "/user/{username}")
//    public ResponseEntity<Object> getUser(@PathVariable("username") String username) {
//        return ResponseEntity.ok().body(userService.getUser(username));
//    }

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> findUserByToken(@RequestHeader Map<String, String> headers) {

        return userService.findUserByToken(headers.get("authorization"));
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
