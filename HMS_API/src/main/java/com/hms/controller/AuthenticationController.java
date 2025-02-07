package com.hms.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.hms.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.sevice.StudentService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String id = loginData.get("id");

        Optional<Student> studentOpt = studentService.getStudentByEmail(email);

        if (studentOpt.isPresent() && studentOpt.get().getId().toString().equals(id)) {
            Map<String, String> response = new HashMap<>();
            response.put("role", "STUDENT");
            response.put("studentId", id);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}


