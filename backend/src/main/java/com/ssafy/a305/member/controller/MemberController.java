package com.ssafy.a305.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a305.member.dto.MemberInfoResDTO;
import com.ssafy.a305.member.dto.UniqueEmailCheckResDTO;
import com.ssafy.a305.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@GetMapping("/check-email")
	public ResponseEntity<UniqueEmailCheckResDTO> checkPreExistEmail(@RequestParam String email) {
		return ResponseEntity.ok(memberService.checkPreExistEmail(email));
	}

	@GetMapping("/member")
	public ResponseEntity<MemberInfoResDTO> getMemberInfo(@RequestHeader("Authorization") String token) {
		/*token을 검증한 후 id로 반환하는 로직 필요

		 */
		Integer id = 0;

		return ResponseEntity.ok(memberService.getMemberInfo(id));
	}
}
