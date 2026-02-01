package com.korit.sa_one_back.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerApiConfig {

    @Bean
    public OpenAPI openAPIConfig() {
        OpenAPI openAPI = new OpenAPI();
        Info info = new Info();
        info.title("SA:ONE Project");
        info.version("1.0");
        info.description("사장님 혼자 관리하는 직원 시스템");

        SecurityRequirement securityRequirement = new SecurityRequirement();
        securityRequirement.addList("Bearer Authentication");

        SecurityScheme securityScheme = new SecurityScheme();
        securityScheme.name("Bearer Authentication");
        securityScheme.type(SecurityScheme.Type.HTTP);
        securityScheme.scheme("bearer");
        securityScheme.bearerFormat("JWT");

        Components components = new Components();
        components.addSecuritySchemes("Bearer Authentication", securityScheme);

        return openAPI
                .info(info)
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}
