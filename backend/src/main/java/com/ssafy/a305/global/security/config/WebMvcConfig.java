package com.ssafy.a305.global.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:3000") // 허용할 도메인 설정
			.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"); // 허용할 HTTP 메소드 설정
	}
}