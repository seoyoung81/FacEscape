package com.ssafy.a305.ranking.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RankingElementDTO {
	private Integer rank;
	private String clearTime;
	private String clearDate;
	private List<MemberInfoForRankingDTO> participants;
}
