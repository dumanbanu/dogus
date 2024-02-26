package com.dogus.dogusbackend.Controller;

import com.dogus.dogusbackend.Dto.UserDto;
import com.dogus.dogusbackend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RequestMapping(value = "/user")
@Controller
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<UserDto> create(UserDto payload) {
        try {
            return ResponseEntity.ok(userService.create(payload));
        } catch (Exception validationException) {
            validationException.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
