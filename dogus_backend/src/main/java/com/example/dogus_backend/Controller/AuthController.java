package com.example.dogus_backend.Controller;

import com.example.dogus_backend.Dto.UserDto;
import com.example.dogus_backend.Service.AuthService;
import com.example.dogus_backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RequestMapping()
@Controller
public class AuthController {

    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto payload) {
        try {
            return ResponseEntity.ok(authService.login(payload));
        } catch (Exception validationException) {
            validationException.printStackTrace();
            return ResponseEntity.badRequest().body(validationException.getLocalizedMessage());
        }
    }

}
