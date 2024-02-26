package com.dogus.dogusbackend.Dto;

import com.dogus.dogusbackend.Entity.UserEntity;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.UUID;

@Data
@RequiredArgsConstructor
@Getter
@Setter
public class UserDto {
    private UUID id;
    private String name;
    private String email;
    private String password;

}
