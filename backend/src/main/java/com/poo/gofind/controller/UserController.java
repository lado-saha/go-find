package com.poo.gofind.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poo.gofind.model.GoUser;
import com.poo.gofind.service.GoUserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private GoUserService userService;

    @PostMapping
    public ResponseEntity<GoUser> createUser(@RequestBody GoUser user) {
        GoUser savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoUser> getUserById(@PathVariable Long id) {
        GoUser user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoUser> updateUser(@PathVariable Long id, @RequestBody GoUser user) {
        user.setId(id);
        GoUser updatedUser = userService.saveUser(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countUsers() {
        long count = userService.countUsers();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/login")
    public ResponseEntity<GoUser> getMethodName(@RequestParam String email) {
        return new ResponseEntity<GoUser>(userService.findByEmail(email), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<GoUser>> searchUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page - 1, size);

        // If all parameters are null or empty, return all users
        if ((name == null || name.isEmpty()) &&
                (email == null || email.isEmpty()) &&
                (phone == null || phone.isEmpty())) {
            Page<GoUser> users = userService.findAll(pageable);
            return new ResponseEntity<>(users, HttpStatus.OK);
        }

        Page<GoUser> users = userService.searchUsers(name, email, phone, pageable);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
