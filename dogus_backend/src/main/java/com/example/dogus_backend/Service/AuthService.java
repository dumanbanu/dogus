package com.example.dogus_backend.Service;

import com.example.dogus_backend.Dto.UserDto;
import com.example.dogus_backend.Entity.UserEntity;
import com.example.dogus_backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public UserDto login(UserDto userDto) throws Exception{
        UserEntity userEntity = userRepository.findAllByEmail(userDto.getEmail());
        if (userEntity == null) {
            throw new Exception("Email not found");
        }
        if (!userEntity.getPassword().equals(userDto.getPassword())) {
            throw new Exception("Invalid password");
        }
        return new ModelMapper().map(userEntity, UserDto.class);
    }
}
