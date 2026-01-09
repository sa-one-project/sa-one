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
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter; // IoC가 제어할 수 있는 객체
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final OAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean  // Security에서 꼭 세팅 필요
    public SecurityFilterChain FilterChain(HttpSecurity http) throws Exception{

        // CORS적용, 세션 비활성화, http기본 로그인 비활성화, form 로그인 비활성화, csrf 비활성화 -> csr이기때문

        // 모든 세팅들은 다 람다로 들어감

        // CrossOrigin 적용
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        // 세션 비활성화(무상태) 설정
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // http 기본 로그인 비활성화
        http.httpBasic(httpBasic -> httpBasic.disable());

        // form 로그인 비활성화
        http.formLogin(formLogin -> formLogin.disable());

        // csrf 비활성화 ->  CSRF = 로그인된 사용자의 권한을 악용해 몰래 요청을 보내게 만드는 공격.(워터마크)
        http.csrf(csrf -> csrf.disable());

        //
        /*
            EndPoint호출 -> https://openapi.naver.com/v1/nid/me 호출

         */

        http.oauth2Login(oauth2 -> oauth2.userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
                .successHandler(oAuth2SuccessHandler));

        // 특정 필터(UsernamePasswordAuthenticationFilter) 전에 직접 만든 필터(jwtAuthenticationFilter) 추가
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // 모든 요청(URL)에 대해 인증 없이 누구나 접근할 수 있도록 허용하는 설정
        http.authorizeHttpRequests(auth -> {
            // permission 전체 허용 -> 이 요청 url은 열어주라고 명령하는것
            auth.requestMatchers("/api/auth/**").permitAll();
            auth.requestMatchers("/v3/api-docs/**").permitAll();
            auth.requestMatchers("/swagger-ui/**").permitAll();
            auth.requestMatchers("/swagger-ui.html").permitAll();
            auth.requestMatchers("/doc").permitAll();
            auth.requestMatchers("/oauth2/**").permitAll();
            auth.requestMatchers("/login/**").permitAll();
            auth.requestMatchers("/image/**").permitAll();
            auth.anyRequest().authenticated();
        });

        http.exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint));

        return http.build(); // 예외처리 필요
    }

    @Bean
    //CorsConfigurationSource ->  reactive안붙은거 사용
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();
        // 5173, 5174 프론트앤드 URL 주소로 접속하는 사람들 다 허용
        cors.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174"));
        // 허용해주고 싶은 요청들만 CrossOrigin 풀어주기
//        cors.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        cors.setAllowedMethods(List.of("*"));
        // 모든 Header 다 허용
        cors.setAllowedHeaders(List.of("*"));
        // 인증을 할 때 인증서 등의 쿠키 허용
        cors.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //  /** : 모든 URL에 요청을 다 허용 -> 프론트앤드에서 서버로 요청을 날릴 수 있다.
        source.registerCorsConfiguration("/**", cors);
        return source;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
