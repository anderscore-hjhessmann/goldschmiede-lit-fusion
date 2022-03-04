package com.anderscore.samples.tasks.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name="TASK")
@Getter
@Setter
@ToString
public class TaskEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private LocalDate due;

    private Boolean done;
}
