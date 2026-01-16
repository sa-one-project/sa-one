package com.korit.sa_one_back.dto.request;

import com.korit.sa_one_back.entity.UserEntity;
import lombok.Data;

@Data
public class UpdateMyPageReqDto {

    private String phone;
    private String email;
    private String imgUrl;

    public UserEntity toEntity(UserEntity user) {
        return UserEntity.builder()
                .userId(user.getUserId())
                .roleId(user.getRoleId())
                .username(user.getUsername())
                .password(user.getPassword())

                .oauth2Id(user.getOauth2Id())
                .provider(user.getProvider())

                .name(user.getName())
                .gender(user.getGender())
                .birthDate(user.getBirthDate())

                .phone(phone != null ? phone : user.getPhone())
                .email(email != null ? email : user.getEmail())
                .imgUrl(imgUrl != null ? imgUrl : user.getImgUrl())
                .imgPath(user.getImgPath())
                .isDeleted(user.isDeleted())
                .build();
    }
}

