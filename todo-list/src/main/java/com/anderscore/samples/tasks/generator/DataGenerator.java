package com.anderscore.samples.tasks.generator;

import com.anderscore.samples.tasks.TaskRepository;
import com.anderscore.samples.tasks.entity.TaskEntity;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Log
public class DataGenerator implements CommandLineRunner {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        if (taskRepository.count() != 0) {
            log.info("Using existing database...");
            return;
        }
        taskRepository.save(createTask("Git Tutorial", 1));
        taskRepository.save(createTask("Learn async JavaScript", 2));
        taskRepository.save(createTask("Read Hilla docs", 5));
    }

    private TaskEntity createTask(String name, int dueOffset) {
        TaskEntity task = new TaskEntity();
        task.setName(name);
        task.setDue(LocalDate.now().plusDays(dueOffset));
        return task;
    }
}
