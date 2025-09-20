package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.config.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody UserDTO user) {
        String result = userService.registerUser(user.getUsername(), user.getPassword());
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return response;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserDTO user) {
        Map<String, String> response = new HashMap<>();
        if(userService.loginUser(user.getUsername(), user.getPassword()).equals("Login successful!")) {
            String token = jwtUtil.generateToken(user.getUsername());
            response.put("token", token);
            response.put("status", "success");
        } else {
            response.put("status", "error");
            response.put("message", "Invalid credentials!");
        }
        return response;
    }
}
