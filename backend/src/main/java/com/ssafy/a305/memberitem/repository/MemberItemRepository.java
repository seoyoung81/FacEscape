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
	//멤버가 보유한 아이템
	List<MemberItem> findByMemberId(Integer memberId);

	//멤버가 보유한 타입별 아이템
	List<MemberItem> findByMemberIdAndItem_ItemType_Name(Integer memberId, String itemTypeName);

	//멤버가 장착 중인 아이템
	List<MemberItem> findByMemberIdAndUsedYN(Integer memberId, boolean usedYN);

	//멤버가 장착 중인 타입별 아이템
	Optional<MemberItem> findByMemberIdAndUsedYNAndItem_ItemType(Integer memberId, boolean usedYN, ItemType itemType);

	//멤버가 보유한 특정 아이템
	Optional<MemberItem> findByMemberIdAndItemId(Integer memberId, Integer itemId);

	//랭킹에서 게임 참가자들 각각의 아이콘 이미지
	@Query("SELECT mi.member.id, mi.item.image FROM MemberItem mi WHERE mi.usedYN = true AND mi.item.itemType.id = 2 AND mi.member.id IN :memberIds")
	List<Object[]> findIconImageByMemberIdsIn(@Param("memberIds") List<Integer> memberIds);

}