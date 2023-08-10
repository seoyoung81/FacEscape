package com.ssafy.a305.item.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a305.item.dto.ItemsReqDTO;
import com.ssafy.a305.item.dto.ItemsResDTO;
import com.ssafy.a305.item.service.ItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ItemController {

	private final ItemService itemService;

	@GetMapping("/items")
	public ResponseEntity<ItemsResDTO> getItems(ItemsReqDTO dto) {
		System.out.println("controller: " + dto.getItemType());
		return ResponseEntity.ok(itemService.getItems(dto));
	}
}
