package com.anderscore.samples.tasks.endpoint;

import com.anderscore.samples.tasks.TaskRepository;
import com.anderscore.samples.tasks.entity.TaskEntity;
import dev.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Endpoint
public class TaskEndpoint {

    @Autowired
    private TaskRepository repository;

    public List<TaskEntity> getAllTasks() {
        List<TaskEntity> allTasks = repository.findAll();
        return allTasks;
    }

    public TaskEntity save(TaskEntity task) {
        return repository.save(task);
    }
}
