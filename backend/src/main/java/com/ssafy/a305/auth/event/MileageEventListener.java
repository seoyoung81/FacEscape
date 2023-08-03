package com.ssafy.a305.auth.event;

import java.sql.Timestamp;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.mileage.service.MileageService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class MileageEventListener {
	private final MileageService mileageService;
	private static final int WELCOME_MILEAGE = 100;
	private static final int DAILY_LOGIN_MILEAGE = 80;

	@Transactional
	@TransactionalEventListener
	public void transactionalEventListener(LoginEvent event) {
		Member member = event.getMember();
		Timestamp olderTimestamp = member.getRecentLogin();
		Timestamp newTimestamp = member.updateRecentLogin();

		if (olderTimestamp == null) {
			//회원가입 후 최초 로그인 시 +100 마일리지
			mileageService.changeMileage(member.getId(), WELCOME_MILEAGE);
		} else if (!newTimestamp.toLocalDateTime()
			.toLocalDate()
			.isEqual(olderTimestamp.toLocalDateTime().toLocalDate())) {
			// 일일 로그인 +80
			mileageService.changeMileage(member.getId(), DAILY_LOGIN_MILEAGE);
		}
	}
}
