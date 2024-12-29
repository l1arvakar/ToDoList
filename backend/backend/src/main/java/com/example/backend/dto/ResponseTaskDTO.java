package com.example.backend.dto;

import com.example.backend.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTaskDTO {
    private long id;

    private String title;

    private String description;

    private Date createDate;

    private Date completeDate;

    private Task.Status status;

    private ResponseUserDTO user;
}
