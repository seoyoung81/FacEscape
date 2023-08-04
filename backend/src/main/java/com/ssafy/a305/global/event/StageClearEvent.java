package com.ssafy.a305.global.event;

import java.util.List;

import com.ssafy.a305.member.domain.Member;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class StageClearEvent {
	private final List<Member> participants;
}
