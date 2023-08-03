package com.ssafy.a305.global.event;

import java.sql.Timestamp;

import com.ssafy.a305.member.repository.MemberRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.mileage.service.MileageService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class MileageEventListener {
	private final MileageService mileageService;
	private final MemberRepository memberRepository;
	private static final int WELCOME_MILEAGE = 100;
	private static final int DAILY_LOGIN_MILEAGE = 20;

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	@TransactionalEventListener
	public void transactionalEventListener(LoginEvent event) {
		Member member = event.getMember();
		Timestamp olderTimestamp = member.getRecentLogin();
		Timestamp newTimestamp = member.updateRecentLogin();
		Integer mileage = member.getMileage();
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
	}
}
