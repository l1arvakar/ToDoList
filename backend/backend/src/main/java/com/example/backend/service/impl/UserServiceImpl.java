package com.example.backend.service.impl;

import com.example.backend.dto.RequestUserDTO;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl  implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public List<RequestUserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new ResourceNotFoundException("No users found");
        }
        return users.stream()
                .map(userMapper::toREQDto)
                .toList();
    }

    @Override
    public Page<RequestUserDTO> getAllUsersByPage(PageRequest pageRequest) {
        Page<User> userPage = userRepository.findAll(pageRequest);
        if (userPage.isEmpty()) {
            throw new ResourceNotFoundException("No users found.");
        }
        return userPage.map(userMapper::toREQDto);
    }

    @Override
    public RequestUserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return userMapper.toREQDto(user);
    }

    @Override
    public Optional<RequestUserDTO> getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::toREQDto);
    }


    @Override
    public RequestUserDTO createUser(RequestUserDTO requestUserDTO) {
        User user = userMapper.toEntity(requestUserDTO);
        User savedUser = userRepository.save(user);
        return userMapper.toREQDto(savedUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        userRepository.delete(user);
    }
}
