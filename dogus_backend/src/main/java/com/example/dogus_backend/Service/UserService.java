package com.example.dogus_backend.Service;

import com.example.dogus_backend.Dto.UserDto;
import com.example.dogus_backend.Entity.UserEntity;
import com.example.dogus_backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDto create(UserDto payload){
        UserEntity userEntity = userRepository.save(new ModelMapper().map(payload, UserEntity.class));
        return new ModelMapper().map(userEntity, UserDto.class);
    }

}

