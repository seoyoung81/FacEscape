package com.ssafy.a305.record.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.a305.record.domain.GameParticipant;
import com.ssafy.a305.record.domain.GameRecord;

public interface GameParticipantRepository extends JpaRepository<GameParticipant, Integer> {
	List<GameParticipant> findByGameRecordIn(List<GameRecord> gameRecords);
}
