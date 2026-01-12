package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
//    int insert(User user);
//    User findByUserId(int userId);
//    User findByOauth2Id(String oauth2Id);
//    User findByNickname(String nickname);
//    String createNickname();

//    int insert(User user);

//    User findByUserId(@Param("userId") long userId);
//
//    // 아이디 / 비번 로그인
//    User findByUsername(@Param("username") String username);
//
//    // 소셜 로그인용 (oauth2Id + provider)
//    User findByOauth2IdAndProdiver(@Param("oauth2Id") String oauth2Id,
//                                   @Param("provider") String provider);
//
//    // roleId 업데이트
//    int updateRoleId(@Param("userId") long userId,
//                     @Param("roleId") long roleId);


    int insert(UserEntity user);

    UserEntity findByUserId(int userId);
    UserEntity findByUsername(String username);
    UserEntity findByOauth2IdAndProvider(UserEntity user);


}
