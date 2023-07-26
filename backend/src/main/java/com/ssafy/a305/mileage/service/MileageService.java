package com.ssafy.a305.mileage.service;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;
import com.ssafy.a305.mileage.domain.MileageHistory;
import com.ssafy.a305.mileage.repository.MileageHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MileageService {

    private final MileageHistoryRepository mileageHistoryRepository;
    private final MemberRepository memberRepository;

    public void changeMileage(Integer memberId, Integer mileageChange) {
        Member member = memberRepository.findById(memberId).orElseThrow(NoSuchElementException::new);
        Integer currentMileage = member.getMileage();
        Integer updatedMileage = currentMileage + mileageChange;
        member.setMileage(updatedMileage);
        memberRepository.save(member);

        // 마일리지 변화가 생길 때마다 MileageHistory를 생성
        createMileageHistory(memberId, mileageChange);
    }

    public void createMileageHistory(Integer memberId, Integer amount) {
        Member member = memberRepository.findById(memberId).orElseThrow(NoSuchElementException::new);

        MileageHistory mileageHistory = new MileageHistory();
        mileageHistory.setMember(member);
        mileageHistory.setAmount(amount);
        mileageHistory.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        mileageHistoryRepository.save(mileageHistory);
    }

}
