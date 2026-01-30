package com.korit.sa_one_back.controller.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @GetMapping("/api/admin/dashboard")
    public void getDashboard() {}
}
