package com.ssafy.a305.item.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.ssafy.a305.item.domain.Item;
import com.ssafy.a305.item.domain.ItemType;
import com.ssafy.a305.item.dto.ItemsReqDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ItemDynamicQueryRepositoryImpl implements ItemDynamicQueryRepository {

	private final EntityManager entityManager;

	@Override
	public List<Item> findByItemsByDTO(ItemsReqDTO dto) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Item> cq = cb.createQuery(Item.class);

		Root<Item> root = cq.from(Item.class);
		Join<Item, ItemType> itemTypes = root.join("itemType", JoinType.INNER);
		List<Predicate> predicates = new ArrayList<>();

		// 아이템 카테고리(타입) 쿼리 조건 동적 추가
		String searchItemType = dto.getItemType();
		if (searchItemType != null && !searchItemType.isEmpty()) {
			predicates.add(cb.equal(itemTypes.get("name"), searchItemType));
		}

		// 아이템명 쿼리 조건 동적 추가
		String itemName = dto.getKeyword();
		if (itemName != null && !itemName.isEmpty()) {
			predicates.add(cb.like(root.get("name"), "%" + itemName + "%"));
		}

		cq.where(predicates.toArray(new Predicate[0]));
		cq.orderBy(cb.desc(root.get("id")));

		TypedQuery<Item> query = entityManager.createQuery(cq);

		return query.getResultList();
	}
}
