package com.ssafy.a305.memberitem.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PurchasedItemResDTO {
	private List<PurchasedItemElementDTO> items;
}
