package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.request.CreateEmployeeReqDto;
import com.korit.sa_one_back.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    int insertLocalUser(UserEntity user);
    int insertOauth2User(UserEntity user);

    UserEntity findByUserId(long userId);
    UserEntity findUserByUsername(String username);
    UserEntity findByOauth2IdAndProvider(String provider, String oauth2Id);

    Long findUserIdByEmail(@Param("email") String email);
    String findRoleNameByUserId(Long userId);

    int updateMyPage(UserEntity user);

    int softDelete(long userId);
    int updateEmployeeProfile(
            @Param("userId") Long userId,
            @Param("dto") CreateEmployeeReqDto dto);

    String findUsernameByNameAndEmail(String name, String email);

    int updatePassword(@Param("userId") Long userId, @Param("password") String password);

    int findRoleIdByUserId(@Param("userId") Long userId);

}
