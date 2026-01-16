package com.korit.sa_one_back.filter;

import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.jwt.JwtTokenProvider;
import com.korit.sa_one_back.mapper.UserMapper;
import com.korit.sa_one_back.security.PrincipalUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String bearerToken = request.getHeader("Authorization");
        // 토큰이 안들어왔거나 잘못된 토큰일 경우를 검사
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println(bearerToken);
        // replaceAll -> Bearer 을 공백으로 바꿔줌 -> 제거
        String accessToken = bearerToken.replaceAll("Bearer ", "");

        if (!jwtTokenProvider.validateToken(accessToken)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 토큰이 유효할 경우
        int userId = jwtTokenProvider.getUserId(accessToken);
        UserEntity foundUser = userMapper.findByUserId(userId);

        if (foundUser == null) {
            filterChain.doFilter(request, response);
            return;
        }

//        String role = foundUser.getRoleId() == 1 ? "ROLE_OWNER" : "ROLE_STAFF";

//        Collection<? extends GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

        // oauth2Id null 방지
        String oauth2Id = foundUser.getOauth2Id() == null ? "" : foundUser.getOauth2Id();

        String provider = foundUser.getProvider() == null ? "" : foundUser.getProvider();
        String email = foundUser.getEmail() == null ? "" : foundUser.getEmail();
        String name = foundUser.getName() == null ? "" : foundUser.getName();

        PrincipalUser principalUser = new PrincipalUser(
                Map.of("id", oauth2Id),
                oauth2Id,
                provider,
                email,
                name,
                foundUser
        );

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(principalUser, "", principalUser.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        // 필터 연결
        filterChain.doFilter(request, response);
    }

}
/*
    서버 -> 처음으로 사이트에 들어왔으면 회원가입 하기
    회원가입 -> 로그인할 정보를 제공하는 것
    요청을 날려야 함  -> 인증이 필요 없음 -> 필터를 타면 안됨.
    -> 이 필터는 인증이 필요할 때만 타는 필터
    permitAll() : 인가 -> 회원가입 URL이 있어야 통과시킴
    회원가입을 하면 DB에 데이터가 저장됨
    ->로그인
    -> ID, PW를 입력한 다음 이전에 알려준 정보와 일치하면(인증)
    -> 인증 요청을 날림
    -> 서버 측에서는 ID, PW 맞는지 확인한 다음에
    -> 응답으로 토큰을 발행해 줌
    -> 클라이언트는 토큰을 가지고 있고, 이 클라이언트의 토큰을 이후의 다른 요청에 사용
    -> 로그인할 때 인증이 되어있어야 하나? --> NO
    => 로그인 요청도 permitAll();
    --> 데이터를 요청할 경우 인가가 필요
    -> 인증 이후의 받은 토큰을 가지고 인가를 받아야 함.
    ->회원가입, 로그인 외의 나머지 다른 모든 요청들은 인가받아야함.
*/