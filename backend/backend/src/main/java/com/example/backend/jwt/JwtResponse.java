package com.example.backend.jwt;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtResponse {
    private final String type = "Bearer";

    @NotBlank(message = "Missing access token")
    private String accessToken;

    @NotBlank(message = "Missing refresh token")
    private String refreshToken;
}
