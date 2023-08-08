package com.ssafy.a305.item.repository;

import java.util.List;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.item.dto.ItemsReqDTO;

public interface ItemDynamicQueryRepository {
	List<Item> findByItemsByDTO(ItemsReqDTO dto);
}
