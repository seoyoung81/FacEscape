package com.ssafy.a305.memberitem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PurchasedItemElementDTO {
	private Integer itemId;
	private String name;
	private String image;
	private boolean usedYN;
}
