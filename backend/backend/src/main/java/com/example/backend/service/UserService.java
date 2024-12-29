package com.example.backend.service;

import com.example.backend.dto.RequestUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<RequestUserDTO> getAllUsers();
    Page<RequestUserDTO> getAllUsersByPage(PageRequest pageRequest);
    RequestUserDTO getUserById(Long id);
    Optional<RequestUserDTO> getUserByUsername(String username);
    RequestUserDTO createUser(RequestUserDTO requestUserDTO);
    void deleteUser(Long id);
}
