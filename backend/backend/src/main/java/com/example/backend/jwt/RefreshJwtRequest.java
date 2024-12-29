package com.example.backend.jwt;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshJwtRequest {
    @NotBlank(message = "Missing refresh token")
    public String refreshToken;
}
