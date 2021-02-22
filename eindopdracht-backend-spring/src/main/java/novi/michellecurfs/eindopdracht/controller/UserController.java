package novi.michellecurfs.eindopdracht.controller;

import novi.michellecurfs.eindopdracht.model.User;
import novi.michellecurfs.eindopdracht.payload.request.UserUpdateRequest;
import novi.michellecurfs.eindopdracht.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> findUserByToken(@RequestHeader Map<String, String> headers) {

        return userService.findUserByToken(headers.get("authorization"));
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Object> getUser(@PathVariable("username") String username) {

        return ResponseEntity.ok().body(userService.getUserByUsername(username));
    }

    @PatchMapping("/update")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateUser(@RequestHeader Map<String, String> headers, @RequestBody UserUpdateRequest userUpdateRequest){

        return userService.updateUserById(headers.get("authorization"), userUpdateRequest);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteUser(@RequestHeader Map<String, String> headers, @RequestBody String username){
        return userService.deleteUser(headers.get("authorization"), username);
    }


}
