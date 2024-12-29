package com.example.backend.dto;

import com.example.backend.entity.Task;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestTaskDTO {
    private long id;

    @NotBlank(message = "Title is mandatory")
    @Size(min = 2, max = 20, message = "Title should be between 2 and 20 characters")
    private String title;

    private String description;

    private Date createDate;

    private Date completeDate;

    private Task.Status status;

    @NotNull(message = "User is mandatory")
    @Valid
    private RequestUserDTO user;
}
