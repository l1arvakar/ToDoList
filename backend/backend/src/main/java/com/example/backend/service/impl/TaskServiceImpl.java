package com.example.backend.service.impl;

import com.example.backend.dto.RequestTaskDTO;
import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import com.example.backend.mapper.TaskMapper;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final String NOT_FOUND_MESSAGE = "Task not found with id: ";
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;

    @Override
    public List<RequestTaskDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        if (tasks.isEmpty()) {
            throw new ResourceNotFoundException("No tasks found");
        }

        return tasks.stream()
                .map(taskMapper::toREQDto)
                .toList();
    }

    @Override
    public Page<RequestTaskDTO> getAllTasksByPage(PageRequest pageRequest) {
        Page<Task> taskPage = taskRepository.findAll(pageRequest);
        if (taskPage.isEmpty()) {
            throw new ResourceNotFoundException("No orders found.");
        }
        return taskPage.map(taskMapper::toREQDto);
    }

    @Override
    public RequestTaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + id));
        return taskMapper.toREQDto(task);
    }

    @Override
    public RequestTaskDTO createTask(RequestTaskDTO requestTaskDTO) {
        User user = userRepository.findById(requestTaskDTO.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + requestTaskDTO.getUser().getId()));

        Task task = taskMapper.toEntity(requestTaskDTO);
        task.setUser(user);
        Task savedTask = taskRepository.save(task);

        return taskMapper.toREQDto(savedTask);
    }

    @Override
    public RequestTaskDTO updateTask(Long id, RequestTaskDTO requestTaskDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + id));
        task.setTitle(requestTaskDTO.getTitle());
        task.setDescription(requestTaskDTO.getDescription());
        task.setCreateDate(requestTaskDTO.getCreateDate());
        task.setCompleteDate(requestTaskDTO.getCompleteDate());
        task.setStatus(requestTaskDTO.getStatus());
        Task updatedTask = taskRepository.save(task);
        return taskMapper.toREQDto(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + id));
        taskRepository.delete(task);

    }

    @Override
    public List<RequestTaskDTO> getTasksByUser(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + userId));
        List<Task> tasks = taskRepository.findByUserId(userId);
        return tasks.stream()
                .map(taskMapper::toREQDto)
                .toList();
    }
}
