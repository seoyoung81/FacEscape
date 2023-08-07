package com.ssafy.a305.auth.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.auth.domain.MemberDetails;
import com.ssafy.a305.auth.exception.LoginException;
import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;
import com.ssafy.a305.mileage.service.MileageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationProviderService implements AuthenticationProvider {

	private final UserDetailsService userDetailService;
	private final PasswordEncoder passwordEncoder;
	private final MemberRepository memberRepository;
	private final MileageService mileageService;
	private static final int WELCOME_MILEAGE = 100;
	private static final int DAILY_LOGIN_MILEAGE = 20;

	@Override
	@Transactional
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String email = authentication.getPrincipal().toString();
		String rawPassword = authentication.getCredentials().toString();
		MemberDetails memberDetails = (MemberDetails)userDetailService.loadUserByUsername(email);
		if (!passwordEncoder.matches(rawPassword, memberDetails.getPassword())) {
			log.debug("Member: {}, password not match exception", email);
			throw new LoginException();
		}

		Member member = memberRepository.findById(memberDetails.getId()).orElseThrow(
			NoSuchElementException::new);

		Timestamp olderTimestamp = member.getRecentLogin();
		Timestamp newTimestamp = member.updateRecentLogin();
		Integer mileage = member.getMileage();
		if (mileage == null) {
			mileage = 0;
		}
		memberRepository.save(member);

		if (olderTimestamp == null) {
			//회원가입 후 최초 로그인 시 +100 마일리지
			mileageService.changeMileage(member.getId(), mileage + WELCOME_MILEAGE);
		} else if (!newTimestamp.toLocalDateTime()
			.toLocalDate()
			.isEqual(olderTimestamp.toLocalDateTime().toLocalDate())) {
			// 일일 로그인 +20
			mileageService.changeMileage(member.getId(), mileage + DAILY_LOGIN_MILEAGE);
		}

		return new UsernamePasswordAuthenticationToken(memberDetails.getId(), "", List.of(() -> "USER"));
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}
