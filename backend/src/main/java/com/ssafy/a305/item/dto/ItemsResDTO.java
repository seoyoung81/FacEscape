package com.ssafy.a305.item.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ItemsResDTO {
	private List<ItemElementDTO> items;
}
