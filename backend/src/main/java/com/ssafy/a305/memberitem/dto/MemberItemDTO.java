package com.ssafy.a305.memberitem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberItemDTO {
	private String member;
	private String item;
	private Boolean usedYN;
}
