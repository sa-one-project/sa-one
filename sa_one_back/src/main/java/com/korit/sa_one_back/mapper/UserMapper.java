package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.request.CreateEmployeeReqDto;
import com.korit.sa_one_back.entity.UserEntity;
import jakarta.validation.constraints.NotBlank;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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


    int insertLocalUser(UserEntity user);
    int insertOauth2User(UserEntity user);

    UserEntity findByUserId(long userId);
    UserEntity findUserByUsername(String username);
    UserEntity findByOauth2IdAndProvider(String provider, String oauth2Id);

    Long findUserIdByEmail(@Param("email") String email);
    String findRoleNameByUserId(Long userId);

    int updateMyPage(UserEntity user);

    int softDelete(long userId);

    int updateMyPage(UserEntity user);

}
