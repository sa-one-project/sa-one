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

            auth.requestMatchers("/signin/**").permitAll();
            auth.requestMatchers("/signup/**").permitAll();
            auth.requestMatchers("/image/**").permitAll();
            auth.requestMatchers("/api/account/**").permitAll();

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
            auth.requestMatchers("/api/owner/inquiries/**").hasRole("OWNER");
            auth.requestMatchers("/api/store/*/employees/**").hasRole("OWNER");

            // -------------------------
            // (D) 직원(EMPLOYEE) 전용
            // - 내 출결 조회
            // - 직원 마이페이지
            // -------------------------
            auth.requestMatchers("/api/attendances/me").hasRole("STAFF");
            auth.requestMatchers("/api/users/employee/**").hasRole("STAFF");
            auth.requestMatchers("/api/employee/inquiries/**").hasRole("STAFF");

            // -------------------------
            // (E) 공통 로그인 사용자(OWNER/EMPLOYEE/ADMIN)
            // - 둘 다 접근 가능한 공용 API가 있으면 여기로
            // -------------------------
            auth.requestMatchers("/api/users/me").hasAnyRole("OWNER", "STAFF", "ADMIN");
            auth.requestMatchers("/error").permitAll();
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
        cors.setAllowedOrigins(List.of("https://githib.store"));
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
