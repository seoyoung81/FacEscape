package com.ssafy.a305.ranking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoForRankingDTO {
	private Integer memberId;
	private String nickname;
	private String icon;
}
