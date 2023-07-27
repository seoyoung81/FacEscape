package com.ssafy.a305.memberitem.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.item.repository.ItemRepository;
import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;
import com.ssafy.a305.memberitem.domain.MemberItem;
import com.ssafy.a305.memberitem.dto.MemberBuyDTO;
import com.ssafy.a305.memberitem.repository.MemberItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberItemService {

	private final MemberItemRepository memberItemRepository;
	private final MemberRepository memberRepository;
	private final ItemRepository itemRepository;

	// 회원이 마일리지를 소모하여 아이템을 구매하는 메서드
	@Transactional
	public void buyItem(MemberBuyDTO dto) {
		// item id와 member id를 찾는다.
		Item item = itemRepository.findById(dto.getItemId()).orElseThrow(() -> new IllegalArgumentException("해당 아이템을 찾을 수 없습니다."));
		Member member = memberRepository.findById(dto.getMemberId()).orElseThrow(() -> new IllegalArgumentException("해당 회원을 찾을 수 없습니다."));

		// item price와 member mileage를 찾는다.
		int price = item.getPrice();
		int mileage = member.getMileage();

		// 구매가능 조건을 판별한다.
		if (mileage < price) {
			throw new IllegalStateException("마일리지가 부족하여 구매할 수 없습니다.");
		}

		// 마일리지를 차감한다.
		member.updateMileage(mileage - price);

		// memberitem에 보유 목록을 저장한다.
		MemberItem memberItem = MemberItem.builder()
			.member(member)
			.item(item)
			.usedYN(false)
			.build();
		memberItemRepository.save(memberItem);
	}

	// 회원이 구매한 모든 아이템을 반환하는 메서드
	// memberId가 일치하는 item 보유 목록을 리스트로 반환
	public List<MemberItem> showItem(Integer memberId) {
		return memberItemRepository.findByMemberId(memberId);
	}

	// 회원이 아이템을 장착하고 해제하는 메서드
	@Transactional
	public void equipItem(Integer memberId, Integer itemId) {
		// memberId와 itemId로 MemberItem을 조회
		MemberItem memberItem = memberItemRepository.findByMemberIdAndItemId(memberId, itemId).orElseThrow(() -> new IllegalArgumentException("해당 회원이 해당 아이템을 보유하고 있지 않습니다."));

		// usedYN 값을 변경
		boolean currentUsedYN = memberItem.getUsedYN();
		memberItem.updateUsedYN(!currentUsedYN);

		// 변경사항을 memberItemRepository에 저장
		memberItemRepository.save(memberItem);
	}

	// 회원이 장착한 모든 아이템을 반환하는 메서드
	// memberId가 일치하고 usedYN이 true인 item 목록을 리스트로 반환
	public List<MemberItem> showEquippedItem(Integer memberId) {
		return memberItemRepository.findByMemberIdAndUsedYN(memberId, true);
	}

}
