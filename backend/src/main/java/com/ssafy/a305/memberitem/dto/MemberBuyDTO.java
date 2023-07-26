package com.ssafy.a305.memberitem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberBuyDTO {
	private String member;
	private String item;
	private String name;
	private Integer price;
}
