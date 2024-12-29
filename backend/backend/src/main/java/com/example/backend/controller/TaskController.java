package com.example.backend.controller;

import com.example.backend.dto.RequestTaskDTO;
import com.example.backend.service.TaskService;
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
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<RequestTaskDTO>> getAllTasks() {
        List<RequestTaskDTO> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/page")
    public ResponseEntity<List<RequestTaskDTO>> getAllTasksByPage(@RequestParam(value = "offset", defaultValue = "0") @Min(0) Integer offset,
                                                                    @RequestParam(value = "limit", defaultValue = "10") @Min(1) @Max(100) Integer limit,
                                                                    @RequestParam(value = "sort", required = false) String sortField,
                                                                    @RequestParam(value = "direction", defaultValue = "asc") String sortDirection){
        Sort.Direction direction = Sort.Direction.fromString(sortDirection.toLowerCase());
        Page<RequestTaskDTO> page = taskService.getAllTasksByPage(PageRequest.of(offset, limit, Sort.by(direction, sortField)));
        List<RequestTaskDTO> tasks = page.getContent();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestTaskDTO> getTaskById(@PathVariable @Min(0) Long id) {
        RequestTaskDTO task = taskService.getTaskById(id);
        return  task != null ? ResponseEntity.ok(task) : ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RequestTaskDTO>> getTasksByUser(@PathVariable @Min(0) Long userId) {
        List<RequestTaskDTO> tasks = taskService.getTasksByUser(userId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<RequestTaskDTO> createTask(@RequestBody @Valid RequestTaskDTO requestTaskDTO) {
        RequestTaskDTO createdTask = taskService.createTask(requestTaskDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RequestTaskDTO> updateTask(@PathVariable @Min(0) Long id, @RequestBody @Valid RequestTaskDTO task) {
        RequestTaskDTO updatedTask = taskService.updateTask(id, task);
        return updatedTask != null ? ResponseEntity.ok(updatedTask) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable @Min(0) Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
