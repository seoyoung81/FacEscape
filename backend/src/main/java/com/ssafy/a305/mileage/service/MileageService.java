package com.ssafy.a305.mileage.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;
import com.ssafy.a305.mileage.domain.MileageHistory;
import com.ssafy.a305.mileage.repository.MileageHistoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MileageService {

	private final MileageHistoryRepository mileageHistoryRepository;
	private final MemberRepository memberRepository;

	// 마일리지 변화
	@Transactional
	public void changeMileage(Integer memberId, Integer mileageChange) {
		Member member = memberRepository.findById(memberId).orElseThrow(NoSuchElementException::new);
		int oldMileage = member.getMileage();
		member.updateMileage(mileageChange);
		memberRepository.save(member);

		// 마일리지 변화가 생길 때마다 MileageHistory를 생성
		createMileageHistory(memberId, mileageChange - oldMileage);
	}

	@Transactional
	public void increaseMileageWithMemberList(List<Integer> memberIds, Integer amount) {
		List<Member> members = memberRepository.findByIdIn(memberIds);
		members.forEach(member -> {
			Integer mileage = member.getMileage();
			member.updateMileage(mileage + amount);
		});
		memberRepository.saveAll(members);
		createMileageHistoryWithMemberList(members, amount);
	}

	// 마일리지 기록 생성 & 저장
	@Transactional
	public void createMileageHistory(Integer memberId, Integer amount) {
		Member member = memberRepository.findById(memberId).orElseThrow(NoSuchElementException::new);
		MileageHistory mileageHistory = MileageHistory.builder()
			.member(member)
			.amount(amount)
			.createdAt(new Timestamp(System.currentTimeMillis()))
			.build();

		mileageHistoryRepository.save(mileageHistory);
	}

	@Transactional
	public void createMileageHistoryWithMemberList(List<Member> members, Integer amount) {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		List<MileageHistory> mileageHistories = members.stream()
			.map(member -> MileageHistory.builder()
				.member(member)
				.amount(amount)
				.createdAt(timestamp)
				.build())
			.collect(Collectors.toList());

		mileageHistoryRepository.saveAll(mileageHistories);
	}

}
