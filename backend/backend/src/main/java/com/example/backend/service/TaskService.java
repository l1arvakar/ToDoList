package com.example.backend.service;

import com.example.backend.dto.RequestTaskDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface TaskService {
    List<RequestTaskDTO> getAllTasks();
    Page<RequestTaskDTO> getAllTasksByPage(PageRequest pageRequest);
    RequestTaskDTO getTaskById(Long id);
    RequestTaskDTO createTask(RequestTaskDTO requestTaskDTO);
    RequestTaskDTO updateTask(Long id, RequestTaskDTO requestTaskDTO);
    void deleteTask(Long id);
    List<RequestTaskDTO> getTasksByUser(Long userId);
}
