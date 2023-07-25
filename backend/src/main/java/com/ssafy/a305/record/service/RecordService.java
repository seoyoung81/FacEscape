package com.ssafy.a305.record.service;

import java.sql.Timestamp;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.member.repository.MemberRepository;
import com.ssafy.a305.record.domain.GameParticipant;
import com.ssafy.a305.record.domain.GameRecord;
import com.ssafy.a305.record.dto.MemberInfoForRecordDTO;
import com.ssafy.a305.record.dto.RecordReqDTO;
import com.ssafy.a305.record.repository.GameParticipantRepository;
import com.ssafy.a305.record.repository.GameRecordRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecordService {

	private final GameRecordRepository gameRecordRepository;
	private final GameParticipantRepository gameParticipantRepository;
	private final MemberRepository memberRepository;

	@Transactional // 중간에 실패 시 롤백
	public void saveRecord(RecordReqDTO dto) {
		//game_record 생성 및 저장
		String date = dto.getClearDate();
		Timestamp timestamp = Timestamp.valueOf(date);
		GameRecord gameRecord = GameRecord.builder()
			.clearDate(timestamp)
			.clearTime(dto.getClearTime())
			.stage(dto.getStage())
			.build();
		gameRecord = gameRecordRepository.save(gameRecord);

		//게임에 참가한 game_participant 생성 및 저장
		List<MemberInfoForRecordDTO> participants = dto.getMembers();
		for (MemberInfoForRecordDTO participant : participants) {
			Member member = memberRepository.findById(participant.getMemberId())
				.orElse(null);
			if (member != null
				|| participant.getMemberId()
				== -1) {
				// 참여자 정보 중 db에 존재하는 회원을 game_participant 테이블 저장(비회원은 member_id를 null로 저장)
				GameParticipant gameParticipant = GameParticipant.builder()
					.member(member)
					.gameRecord(gameRecord)
					.nickname(participant.getNickname())
					.build();
				gameParticipantRepository.save(gameParticipant);
			}
		}
	}

}
