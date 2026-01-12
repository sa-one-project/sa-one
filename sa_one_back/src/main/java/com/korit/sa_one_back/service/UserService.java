package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.OAuth2SignUpReqDto;
import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public void createOauth2User(OAuth2SignUpReqDto dto) {
        UserEntity user = UserEntity.builder()
                .oauth2Id(dto.getOauth2Id())
                .provider(dto.getProvider())
                .name(dto.getName())
                .email(dto.getEmail())
                .imgUrl(dto.getImgUrl())
                .imgPath(null)
                .roleId(dto.getRoleId()) // 사장/직원
                .build();

        userMapper.insert(user);
    }
}

