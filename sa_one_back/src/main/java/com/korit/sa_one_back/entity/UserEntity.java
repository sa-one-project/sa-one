package com.korit.sa_one_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    private Long userId; // PK, NN, AI
    private String username; // NN, UQ
    private String password;
    private String oauth2Id;
    private String provider;
    private String name;
    private String phone; // UQ
    private String email;
    private String imgUrl;
    private String imgPath;
    private int roleId; // NN
    private LocalDateTime createdAt; // NN
    private LocalDateTime updatedAt; // NN
    private String gender;
    private LocalDate birthDate;
    private boolean isDeleted;
    private LocalDateTime deletedAt;
    private String address;
}
