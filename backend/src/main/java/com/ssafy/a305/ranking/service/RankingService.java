package com.ssafy.a305.ranking.service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.ranking.dto.MemberInfoForRankingDTO;
import com.ssafy.a305.ranking.dto.RankingElementDTO;
import com.ssafy.a305.ranking.dto.RankingResDTO;
import com.ssafy.a305.record.domain.GameParticipant;
import com.ssafy.a305.record.domain.GameRecord;
import com.ssafy.a305.record.repository.GameParticipantRepository;
import com.ssafy.a305.record.repository.GameRecordRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RankingService {
	private final GameRecordRepository gameRecordRepository;
	private final GameParticipantRepository gameParticipantRepository;

	@Transactional(readOnly = true)
	public RankingResDTO getRankings(Integer stage) {
		//스테이지별 clearTime 순으로 GameRecord의 리스트 생성
		List<GameRecord> gameRecords = gameRecordRepository.findAllByStageOrderByClearTime(stage);

		//gameRecords에 속하는 기록 내의 참가자 리스트 생성
		List<GameParticipant> gameParticipants = gameParticipantRepository.findByGameRecordIn(gameRecords);

		//<게임 기록의 id - 참가자리스트>로 구성된 맵 생성
		Map<Integer, List<GameParticipant>> memberInfosMap = gameParticipants
			.stream()
			.collect(Collectors.groupingBy(gameParticipant -> gameParticipant.getGameRecord().getId()));

		//랭킹 구성 요소의 리스트로 변환
		List<RankingElementDTO> rankingElements = IntStream.range(0, gameRecords.size())
			.mapToObj(rank -> {
				GameRecord gameRecord = gameRecords.get(rank);
				return new RankingElementDTO(rank + 1, convertClearTimeToString(gameRecord.getClearTime()),
					convertClearDateToString(gameRecord.getClearDate()),
					getMemberInfosWithGameParticipantsList(memberInfosMap.get(gameRecord.getId())));
			})
			.collect(Collectors.toList());

		return new RankingResDTO(rankingElements);
	}

	private String convertClearTimeToString(Integer clearTime) {
		int minutes = clearTime / 60;
		int seconds = clearTime % 60;

		return String.format("%02d:%02d", minutes, seconds);
	}

	private String convertClearDateToString(Timestamp clearDate) {
		return new SimpleDateFormat("yyyy-MM-dd").format(clearDate);
	}

	private List<MemberInfoForRankingDTO> getMemberInfosWithGameParticipantsList(
		List<GameParticipant> gameParticipants) {
		//각 member 별 아이콘 가져오는 로직 필요
		String icon = "임시";

		return gameParticipants.stream()
			.map(gameParticipant -> {
				if (gameParticipant.getMember() == null) {
					return new MemberInfoForRankingDTO(-1,
						gameParticipant.getNickname(), null);
				}
				Integer id = gameParticipant.getMember().getId();
				return new MemberInfoForRankingDTO(id,
					gameParticipant.getNickname(), icon);
			})
			.collect(Collectors.toList());
	}
}
