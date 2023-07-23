package com.ssafy.a305.item.repository;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.item.dto.ItemsReqDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;

import javax.persistence.EntityManager;

@RequiredArgsConstructor
public class ItemDynamicQueryRepositoryImpl implements ItemDynamicQueryRepository {

    private final EntityManager entityManager;

    @Override
    public Page<Item> findByItemsByDTO(ItemsReqDTO dto) {
        return null;
    }
}
