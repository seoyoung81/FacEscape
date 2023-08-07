package com.ssafy.a305.memberitem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.a305.item.domain.ItemType;
import com.ssafy.a305.memberitem.domain.MemberItem;

@Repository
public interface MemberItemRepository extends JpaRepository<MemberItem, Integer> {
	List<MemberItem> findByMemberId(Integer memberId);

	List<MemberItem> findByMemberIdAndUsedYN(Integer memberId, boolean usedYN);

	Optional<MemberItem> findByMemberIdAndUsedYNAndItem_ItemType(Integer memberId, boolean usedYN, ItemType itemType);

	Optional<MemberItem> findByMemberIdAndItemId(Integer memberId, Integer itemId);

	@Query("SELECT mi.member.id, mi.item.image FROM MemberItem mi WHERE mi.usedYN = true AND mi.item.itemType.id = 1 AND mi.member.id IN :memberIds")
	List<Object[]> findIconImageByMemberIdsIn(@Param("memberIds") List<Integer> memberIds);

}