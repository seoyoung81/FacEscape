package com.ssafy.a305.member.repository;

import com.ssafy.a305.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    boolean existsByEmail(String email);
}
