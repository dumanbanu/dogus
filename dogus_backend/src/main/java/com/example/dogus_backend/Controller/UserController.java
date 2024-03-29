package com.example.dogus_backend.Controller;

import com.example.dogus_backend.Dto.UserDto;
import com.example.dogus_backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.security.auth.login.LoginException;

@RequiredArgsConstructor
@RequestMapping(value = "/user")
@Controller
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody UserDto payload) {
        try {
            return ResponseEntity.ok(userService.create(payload));
        } catch (Exception validationException) {
            validationException.printStackTrace();
            return ResponseEntity.badRequest().body(validationException.getLocalizedMessage());
        }
    }
}
