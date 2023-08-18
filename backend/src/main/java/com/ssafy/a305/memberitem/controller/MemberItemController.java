package com.ssafy.a305.memberitem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a305.memberitem.dto.EquippedItemResDTO;
import com.ssafy.a305.memberitem.dto.MemberItemReqDTO;
import com.ssafy.a305.memberitem.dto.PurchasedItemResDTO;
import com.ssafy.a305.memberitem.service.MemberItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberItemController {

	private final MemberItemService memberItemService;

	@PostMapping("/member/item")
	public ResponseEntity<Void> buyItem(@RequestBody MemberItemReqDTO dto, Authentication authentication) {
		memberItemService.buyItem(dto, authentication);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/member/equipment")
	public ResponseEntity<Void> equipItem(@RequestBody MemberItemReqDTO dto, Authentication authentication) {
		memberItemService.equipItem(dto, authentication);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/member/item/purchased")
	public ResponseEntity<PurchasedItemResDTO> getPurchasedItem(@RequestParam String itemType,
		Authentication authentication) {
		return ResponseEntity.ok(
			memberItemService.getPurchasedItem(itemType, Integer.parseInt(authentication.getName())));
	}

	@GetMapping("/member/item/equipped")
	public ResponseEntity<EquippedItemResDTO> getEquippedItem(Authentication authentication) {
		return ResponseEntity.ok(
			memberItemService.getEquippedItem(Integer.parseInt(authentication.getName())));
	}

}
