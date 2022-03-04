package com.anderscore.samples.tasks.endpoint;

import com.anderscore.samples.tasks.TaskRepository;
import com.anderscore.samples.tasks.entity.TaskEntity;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class TaskEndpoint {

    @Autowired
    private TaskRepository repository;

    public @Nonnull List<@Nonnull TaskEntity> getAllTasks() {
        List<TaskEntity> allTasks = repository.findAll();
        return allTasks;
    }

    public TaskEntity save(TaskEntity task) {
        return repository.save(task);
    }
}
