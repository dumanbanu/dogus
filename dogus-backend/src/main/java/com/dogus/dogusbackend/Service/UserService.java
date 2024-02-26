package com.dogus.dogusbackend.Service;

import com.dogus.dogusbackend.Dto.UserDto;
import com.dogus.dogusbackend.Entity.UserEntity;
import com.dogus.dogusbackend.Repository.UserRepository;
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
