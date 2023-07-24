package com.ssafy.a305.member.service;

import com.ssafy.a305.member.dto.UniqueEmailCheckResDTO;
import com.ssafy.a305.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public UniqueEmailCheckResDTO checkPreExistEmail(String email) {
        return new UniqueEmailCheckResDTO(!memberRepository.existsByEmail(email));
    }
}
