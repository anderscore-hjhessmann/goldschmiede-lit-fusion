package com.anderscore.samples.tasks;

import com.anderscore.samples.tasks.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
}
