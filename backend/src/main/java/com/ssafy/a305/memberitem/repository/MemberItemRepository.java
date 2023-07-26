package com.ssafy.a305.memberitem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.a305.memberitem.domain.MemberItem;

@Repository
public interface MemberItemRepository extends JpaRepository<MemberItem, Integer> {

}
