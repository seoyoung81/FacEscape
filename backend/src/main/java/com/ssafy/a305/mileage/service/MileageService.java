package com.ssafy.a305.mileage.service;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;
import com.ssafy.a305.mileage.domain.MileageHistory;
import com.ssafy.a305.mileage.repository.MileageHistoryRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.NoSuchElementException;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class MileageService {

    private final MileageHistoryRepository mileageHistoryRepository;
    private final MemberRepository memberRepository;

    // 마일리지 변화
    public void changeMileage(Integer memberId, Integer mileageChange) {
        Member member = memberRepository.findById(memberId).orElseThrow(NoSuchElementException::new);
        member.updateMileage(mileageChange);
        memberRepository.save(member);

        // 마일리지 변화가 생길 때마다 MileageHistory를 생성
        createMileageHistory(memberId, mileageChange);
    }

    // 마일리지 기록 생성 & 저장
    public void createMileageHistory(Integer memberId, Integer amount) {
        Member member = memberRepository.findById(memberId).orElseThrow(NoSuchElementException::new);
        MileageHistory mileageHistory = MileageHistory.builder()
            .member(member)
            .amount(amount)
            .createdAt(new Timestamp(System.currentTimeMillis()))
            .build();
        mileageHistoryRepository.save(mileageHistory);
    }

}
