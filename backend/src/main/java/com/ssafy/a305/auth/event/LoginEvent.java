package com.ssafy.a305.auth.event;

import com.ssafy.a305.member.domain.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class LoginEvent {
	private final Member member;
}
