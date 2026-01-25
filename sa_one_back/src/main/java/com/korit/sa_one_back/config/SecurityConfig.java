//package com.korit.sa_one_back.config;
//
//import com.korit.sa_one_back.filter.JwtAuthenticationFilter;
//import com.korit.sa_one_back.security.JwtAuthenticationEntryPoint;
//import com.korit.sa_one_back.security.OAuth2SuccessHandler;
//import com.korit.sa_one_back.service.OAuth2UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.List;
//
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//    private final JwtAuthenticationFilter jwtAuthenticationFilter; // IoC가 제어할 수 있는 객체
//    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
//    private final OAuth2UserService oAuth2UserService;
//    private final OAuth2SuccessHandler oAuth2SuccessHandler;
//
//    @Bean  // Security에서 꼭 세팅 필요
//    public SecurityFilterChain FilterChain(HttpSecurity http) throws Exception{
//
//        // CORS적용, 세션 비활성화, http기본 로그인 비활성화, form 로그인 비활성화, csrf 비활성화 -> csr이기때문
//
//        // 모든 세팅들은 다 람다로 들어감
//
//        // CrossOrigin 적용
//        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
//
//        // 세션 비활성화(무상태) 설정
//        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//        // http 기본 로그인 비활성화
//        http.httpBasic(httpBasic -> httpBasic.disable());
//
//        // form 로그인 비활성화
//        http.formLogin(formLogin -> formLogin.disable());
//
//        // csrf 비활성화 ->  CSRF = 로그인된 사용자의 권한을 악용해 몰래 요청을 보내게 만드는 공격.(워터마크)
//        http.csrf(csrf -> csrf.disable());
//
//        //
//        /*
//            EndPoint호출 -> https://openapi.naver.com/v1/nid/me 호출
//
//         */
//
//        http.oauth2Login(oauth2 -> oauth2.userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
//                .successHandler(oAuth2SuccessHandler));
//
//        // 특정 필터(UsernamePasswordAuthenticationFilter) 전에 직접 만든 필터(jwtAuthenticationFilter) 추가
//        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//
//        // 모든 요청(URL)에 대해 인증 없이 누구나 접근할 수 있도록 허용하는 설정
//        http.authorizeHttpRequests(auth -> {
//            // permission 전체 허용 -> 이 요청 url은 열어주라고 명령하는것
//            auth.requestMatchers("/api/auth/**").permitAll();
//            auth.requestMatchers("/v3/api-docs/**").permitAll();
//            auth.requestMatchers("/swagger-ui/**").permitAll();
//            auth.requestMatchers("/swagger-ui.html").permitAll();
//            auth.requestMatchers("/doc").permitAll();
//            auth.requestMatchers("/oauth2/**").permitAll();
//            auth.requestMatchers("/login/**").permitAll();
//            auth.requestMatchers("/image/**").permitAll();
//            auth.requestMatchers("/api/account/**").permitAll();
//            auth.anyRequest().authenticated();
//        });
//
//        http.exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint));
//
//        return http.build(); // 예외처리 필요
//    }
//
//    @Bean
//    //CorsConfigurationSource ->  reactive안붙은거 사용
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration cors = new CorsConfiguration();
//        // 5173, 5174 프론트앤드 URL 주소로 접속하는 사람들 다 허용
//        cors.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174"));
//        // 허용해주고 싶은 요청들만 CrossOrigin 풀어주기
////        cors.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
//        cors.setAllowedMethods(List.of("*"));
//        // 모든 Header 다 허용
//        cors.setAllowedHeaders(List.of("*"));
//        // 인증을 할 때 인증서 등의 쿠키 허용
//        cors.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        //  /** : 모든 URL에 요청을 다 허용 -> 프론트앤드에서 서버로 요청을 날릴 수 있다.
//        source.registerCorsConfiguration("/**", cors);
//        return source;
//    }
//
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//}

package com.korit.sa_one_back.config;

import com.korit.sa_one_back.filter.JwtAuthenticationFilter;
import com.korit.sa_one_back.security.JwtAuthenticationEntryPoint;
import com.korit.sa_one_back.security.OAuth2SuccessHandler;
import com.korit.sa_one_back.service.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true) //필요하면 @PreAuthorize도 쓸 수 있게 열어둠(권장)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final OAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean
    public SecurityFilterChain FilterChain(HttpSecurity http) throws Exception {

        // 1) 프론트 통신 가능하도록 CORS 열기
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        // 2) JWT 기반이니까 세션은 무상태(STATELESS)
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 3) 기본 로그인 기능은 다 끄기(JWT + OAuth2만 사용)
        http.httpBasic(httpBasic -> httpBasic.disable());
        http.formLogin(formLogin -> formLogin.disable());
        http.csrf(csrf -> csrf.disable());

        // 4) OAuth2 로그인 성공시 우리 서버 토큰 발급 로직으로 이동
        http.oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
                .successHandler(oAuth2SuccessHandler)
        );

        // 5) JWT 필터를 UsernamePasswordAuthenticationFilter 앞에 둬서
        //    Authorization: Bearer 토큰을 먼저 처리하게 함
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // 6)여기서 "URL 별 권한"을 딱 정리한다 (핵심)
        http.authorizeHttpRequests(auth -> {

            // -------------------------
            // (A) 완전 공개(로그인 필요 없음)
            // -------------------------
            auth.requestMatchers("/api/auth/**").permitAll();
            auth.requestMatchers("/v3/api-docs/**").permitAll();
            auth.requestMatchers("/swagger-ui/**").permitAll();
            auth.requestMatchers("/swagger-ui.html").permitAll();
            auth.requestMatchers("/doc").permitAll();
            auth.requestMatchers("/oauth2/**").permitAll();
            auth.requestMatchers("/login/**").permitAll();
            auth.requestMatchers("/image/**").permitAll();       // 이미지 조회 공개 (원하면 GET만 허용하도록 나중에 강화)
            auth.requestMatchers("/api/account/**").permitAll(); // 너 프로젝트에서 열어둔거 유지

            // -------------------------
            // (B) 관리자(ADMIN) 전용
            // - 사업장 신청/등록/승인/목록 조회 등
            // -------------------------
            auth.requestMatchers("/api/admin/**").hasRole("ADMIN");
            auth.requestMatchers("/api/stores/admin/**").hasRole("ADMIN");
            auth.requestMatchers("/api/workplaces/admin/**").hasRole("ADMIN");

            // -------------------------
            // (C) 사장(OWNER) 전용
            // - 직원 등록/수정/삭제/조회
            // - 사장이 직원 선택해서 출근/퇴근 처리
            // - 사업장 출결 현황, 직원별 출결 수정
            // - 사장 마이페이지
            // -------------------------
            auth.requestMatchers("/api/workplaces/**").hasRole("OWNER");      // 사업장 기준 관리 API
            auth.requestMatchers("/api/employees/**").hasRole("OWNER");       // 직원관리 API
            auth.requestMatchers("/api/attendances/check-in").hasRole("OWNER");
            auth.requestMatchers("/api/attendances/check-out").hasRole("OWNER");
            auth.requestMatchers("/api/attendances/owner/**").hasRole("OWNER"); // (권장) 사장 전용 출결 API를 이 prefix로 묶기
            auth.requestMatchers("/api/users/owner/**").hasRole("OWNER");     // 사장 마이페이지

            // -------------------------
            // (D) 직원(EMPLOYEE) 전용
            // - 내 출결 조회
            // - 직원 마이페이지
            // -------------------------
            auth.requestMatchers("/api/attendances/me").hasRole("EMPLOYEE");
            auth.requestMatchers("/api/users/employee/**").hasRole("EMPLOYEE");

            // -------------------------
            // (E) 공통 로그인 사용자(OWNER/EMPLOYEE/ADMIN)
            // - 둘 다 접근 가능한 공용 API가 있으면 여기로
            // -------------------------
            auth.requestMatchers("/api/users/me").hasAnyRole("OWNER", "EMPLOYEE", "ADMIN");

            // -------------------------
            // (F) 그 외는 로그인만 하면 접근
            // -------------------------
            auth.anyRequest().authenticated();
        });

        // 7) 인증 예외 처리(토큰 없거나 만료 등)
        http.exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174"));
        cors.setAllowedMethods(List.of("*"));
        cors.setAllowedHeaders(List.of("*"));
        cors.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
