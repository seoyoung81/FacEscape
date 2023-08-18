package com.ssafy.a305.global.event;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import com.ssafy.a305.mileage.service.MileageService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class MileageEventListener {
	private final MileageService mileageService;
	private static final int STAGE_CLEAR_MILEAGE = 80;

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	@TransactionalEventListener
	public void stageClearEventListener(StageClearEvent event) {
		mileageService.increaseMileageWithMemberList(event.getParticipants(), STAGE_CLEAR_MILEAGE);
	}
}