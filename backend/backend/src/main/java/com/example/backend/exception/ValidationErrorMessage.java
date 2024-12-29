package com.example.backend.exception;

import java.util.List;

public record ValidationErrorMessage(List<Violation> violations) {
}
