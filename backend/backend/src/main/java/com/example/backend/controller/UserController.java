package com.example.backend.controller;

import com.example.backend.dto.RequestUserDTO;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<RequestUserDTO>> getAllUsers() {
        List<RequestUserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/page")
    public ResponseEntity<List<RequestUserDTO>> getAllUsersByPage(@RequestParam(value = "offset", defaultValue = "0") @Min(0) Integer offset,
                                                                  @RequestParam(value = "limit", defaultValue = "10") @Min(1) @Max(100) Integer limit,
                                                                  @RequestParam(value = "sort", required = false) String sortField,
                                                                  @RequestParam(value = "direction", defaultValue = "asc") String sortDirection){
        Sort.Direction direction = Sort.Direction.fromString(sortDirection.toLowerCase());
        Page<RequestUserDTO> page = userService.getAllUsersByPage(PageRequest.of(offset, limit, Sort.by(direction, sortField)));
        List<RequestUserDTO> users = page.getContent();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestUserDTO> getUserById(@PathVariable @Min(0) Long id) {
        RequestUserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<RequestUserDTO> createUser(@RequestBody @Valid RequestUserDTO requestUserDto) {
        RequestUserDTO createdUser = userService.createUser(requestUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable @Min(0) Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
