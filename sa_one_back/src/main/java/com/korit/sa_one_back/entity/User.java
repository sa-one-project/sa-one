package com.korit.sa_one_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;

@Alias("User")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int userId; // PK, NN, AI
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
}
