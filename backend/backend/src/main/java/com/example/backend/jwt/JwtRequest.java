package com.example.backend.jwt;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JwtRequest {
    @NotBlank(message = "Missing username")
    private String username;

    @NotBlank(message = "Missing password")
    private String password;
}
