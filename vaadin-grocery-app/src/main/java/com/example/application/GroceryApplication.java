package com.example.application;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 */
@SpringBootApplication
@Theme(value = "vaadingroceryapp")
@PWA(name = "Vaadin Grocery App", shortName = "Vaadin Grocery App", offlineResources = {"images/logo.png"})
public class GroceryApplication implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(GroceryApplication.class, args);
    }

}
