package com.ssafy.a305.memberitem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberBuyDTO {
	private Integer memberId;
	private Integer itemId;
	private String name;
	private Integer price;
}
