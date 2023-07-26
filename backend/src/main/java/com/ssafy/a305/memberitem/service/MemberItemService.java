package com.ssafy.a305.memberitem.service;

import org.springframework.stereotype.Service;

import com.ssafy.a305.item.repository.ItemRepository;
import com.ssafy.a305.member.repository.MemberRepository;
import com.ssafy.a305.memberitem.dto.MemberBuyDTO;
import com.ssafy.a305.memberitem.repository.MemberItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberItemService {

	private final MemberItemRepository memberItemRepository;
	private final MemberRepository memberRepository;
	private final ItemRepository itemRepository;

	public void buyItem(MemberBuyDTO dto) {

	}

	public void showItem() {

	}


}
