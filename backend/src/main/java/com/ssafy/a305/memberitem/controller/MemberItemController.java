package com.ssafy.a305.memberitem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a305.memberitem.dto.MemberBuyDTO;
import com.ssafy.a305.memberitem.service.MemberItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberItemController {

	private final MemberItemService memberItemService;

	@PostMapping("/member/item")
	public ResponseEntity<Void> buyItem(@RequestBody MemberBuyDTO dto) {
		memberItemService.buyItem(dto);
		return ResponseEntity.ok().build();
	}
}
