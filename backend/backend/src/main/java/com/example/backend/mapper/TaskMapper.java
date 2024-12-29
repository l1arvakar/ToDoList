package com.example.backend.mapper;

import com.example.backend.dto.RequestTaskDTO;
import com.example.backend.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface TaskMapper {
    @Mapping(source = "user", target = "user")
    RequestTaskDTO toREQDto(Task task);

    @Mapping(source = "user", target = "user")
    Task toEntity(RequestTaskDTO requestTaskDTO);
}
