package com.ssafy.a305.item.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.item.dto.ItemElementDTO;
import com.ssafy.a305.item.dto.ItemsReqDTO;
import com.ssafy.a305.item.dto.ItemsResDTO;
import com.ssafy.a305.item.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {

	private final ItemRepository itemRepository;

	@Transactional(readOnly = true)
	public ItemsResDTO getItems(ItemsReqDTO dto) {
		List<Item> items = itemRepository.findByItemsByDTO(dto);
		List<ItemElementDTO> itemElements = items.stream()
			.map(ItemElementDTO::new)
			.collect(Collectors.toList());
		return new ItemsResDTO(itemElements);
	}
}
