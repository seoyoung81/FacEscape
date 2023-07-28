package com.ssafy.a305.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.a305.auth.dto.GoogleAccessTokenDTO;
import com.ssafy.a305.auth.dto.GoogleUserInfoDTO;
import com.ssafy.a305.auth.dto.LoginResDTO;
import com.ssafy.a305.auth.util.GoogleOAuthUtils;
import com.ssafy.a305.auth.util.JWTUtils;
import com.ssafy.a305.member.domain.LoginType;
import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoogleOAuthService {
	@Value("${jwt.tokenType}")
	private String tokenType;
	private final GoogleOAuthUtils googleOAuthUtils;
	private final MemberRepository memberRepository;
	private final AuthenticationManager authenticationManager;
	private final JWTUtils jwtUtils;

	public String getGoogleLoginUrl() {
		return googleOAuthUtils.getGoogleLoginUrl();
	}

	@Transactional
	public LoginResDTO googleLogin(String code) throws JsonProcessingException {
		GoogleAccessTokenDTO googleAccessToken = googleOAuthUtils.getAccessToken(code);
		GoogleUserInfoDTO googleUser = googleOAuthUtils.getUserInfo(googleAccessToken);

		//해당 구글 이메일이 db에 없는 경우 회원가입 진행 후 로그인 및 토큰 발급
		if (!memberRepository.existsByEmail(googleUser.getEmail())) {
			memberRepository.save(Member.builder()
				.email(googleUser.getEmail())
				.password("")
				.nickname(googleUser.getName())
				.loginType(LoginType.OAUTH)
				.build());
		}
		Authentication authenticate = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(googleUser.getEmail(), ""));
		String issuedAccessToken = jwtUtils.generateAccessToken(authenticate);
		return new LoginResDTO(tokenType, issuedAccessToken);
	}

}
