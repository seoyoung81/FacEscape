package com.ssafy.a305.record.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.record.domain.GameParticipant;
import com.ssafy.a305.record.domain.GameRecord;

public interface GameParticipantRepository extends JpaRepository<GameParticipant, Integer> {
	List<GameParticipant> findByGameRecordIn(List<GameRecord> gameRecords);

	@Modifying
	@Query("UPDATE GameParticipant p SET p.member = null WHERE p.member = :member")
	void bulkUpdateMemberToNull(@Param("member") Member member);
}
