package com.ssafy.a305.global.security.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.ssafy.a305.global.security.errorhandler.CustomAccessDeniedHandler;
import com.ssafy.a305.global.security.errorhandler.CustomAuthenticationEntryPoint;
import com.ssafy.a305.global.security.filter.JWTFilter;

@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private AuthenticationProvider authenticationProvider;

	@Autowired
	private JWTFilter jwtFilter;

	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(
			AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.authenticationProvider(authenticationProvider);
		return authenticationManagerBuilder.build();
	}

	@Bean
	public CorsConfigurationSource corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowedOrigins(List.of("*"));
		corsConfiguration.setAllowedMethods(
			List.of(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PATCH.name(), HttpMethod.DELETE.name(),
				HttpMethod.OPTIONS.name()));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// http basic을 통한 인증은 하지 않으므로 설정 해제
		http.httpBasic().disable();
		// 기본 Cors 설정은 제외하며, CorsConfigurationSource를 통해 Cors 설정을 제어한다.
		http.cors(AbstractHttpConfigurer::disable);
		// Rest API 서버 이므로 csrf 관련 설정은 사용하지 않는다.
		http.csrf().disable();
		// 인증이 필요한 서비스의 경우 Authorization Header에 Bearer토큰 여부와, 토큰 유효 여부를 판단해야하므로 커스텀 필터를 추가한다.
		// Filter에서 발생한 예외는 Controller Advice를 통해 제어할 수 없으므로 인증/인가 실패 관련 오류 제어를 위한 객체를 추가한다.
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
			.exceptionHandling()
			.authenticationEntryPoint(new CustomAuthenticationEntryPoint())
			.accessDeniedHandler(new CustomAccessDeniedHandler());
		// 사용자 로그인이 필요한 API는 필터가 적용되도록 별도 설정해준다.
		http.authorizeRequests()
			.antMatchers("/logout", "/member/equipment", "/member/item", "/member/item/purchased").authenticated()
			.antMatchers(HttpMethod.DELETE, "/member").authenticated()
			.antMatchers(HttpMethod.PATCH, "/member").authenticated()
			.antMatchers(HttpMethod.GET, "/member").authenticated()
			.anyRequest().permitAll();
		// http Session을 사용하지 않을 것이므로 Policy를 stateless로 설정한다.
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		return http.build();
	}
}
