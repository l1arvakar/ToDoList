package com.example.backend.mapper;

import com.example.backend.dto.RequestUserDTO;
import com.example.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "username", target = "username")
    @Mapping(source = "password", target = "password")
    RequestUserDTO toREQDto(User user);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "username", target = "username")
    @Mapping(source = "password", target = "password")
    User toEntity(RequestUserDTO requestUserDTO);
}
