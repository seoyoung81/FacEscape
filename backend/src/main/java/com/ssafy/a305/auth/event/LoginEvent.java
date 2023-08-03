package com.ssafy.a305.auth.event;

import com.ssafy.a305.member.domain.Member;

public class LoginEvent {
	private Member member;

	public LoginEvent(Member member) {
		this.member = member;
	}

	public Member getMember() {
		return member;
	}
}
