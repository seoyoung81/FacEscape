package com.ssafy.a305.member.controller;

import com.ssafy.a305.member.dto.UniqueEmailCheckResDTO;
import com.ssafy.a305.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/check-email")
    public ResponseEntity<UniqueEmailCheckResDTO> checkPreExistEmail(@RequestParam String email) {
        return ResponseEntity.ok(memberService.checkPreExistEmail(email));
    }
}
