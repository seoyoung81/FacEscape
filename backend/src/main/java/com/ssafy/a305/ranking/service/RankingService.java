package com.ssafy.a305.ranking.service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.memberitem.repository.MemberItemRepository;
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
	private final MemberItemRepository memberItemRepository;

	@Transactional(readOnly = true)
	public RankingResDTO getRankings(Integer stage) {
		//스테이지별 clearTime 순으로 GameRecord의 리스트 생성
		List<GameRecord> gameRecords = gameRecordRepository.findAllByStageOrderByClearTime(stage);

		//gameRecords에 속하는 기록 내의 모든 참가자 리스트 생성
		List<GameParticipant> gameParticipants = gameParticipantRepository.findByGameRecordIn(gameRecords);

		//참가자 리스트로 참가자별 아이콘 리스트 생성
		Map<Integer, String> iconsMap = getIconsMapWithGameParticipantsList(gameParticipants);

		//<게임 기록의 id - 참가자리스트>로 구성된 맵 생성
		Map<Integer, List<GameParticipant>> participantsMap = gameParticipants
			.stream()
			.collect(Collectors.groupingBy(gameParticipant -> gameParticipant.getGameRecord().getId()));

		//<게임 기록 id - 참가자 정보 리스트>
		Map<Integer, List<MemberInfoForRankingDTO>> memberInfosMap = gameParticipants
			.stream()
			.collect(Collectors.groupingBy(
				gameParticipant -> gameParticipant.getGameRecord().getId(),
				Collectors.mapping(gameParticipant -> {
					Member member = gameParticipant.getMember();
					Integer id = (member != null) ? member.getId() : -1;
					return new MemberInfoForRankingDTO(id, gameParticipant.getNickname(), iconsMap.get(id));
				}, Collectors.toList())
			));

		//랭킹 구성 요소의 리스트로 변환
		List<RankingElementDTO> rankingElements = IntStream.range(0, gameRecords.size())
			.mapToObj(rank -> {
				GameRecord gameRecord = gameRecords.get(rank);
				return new RankingElementDTO(rank + 1, convertClearTimeToString(gameRecord.getClearTime()),
					convertClearDateToString(gameRecord.getClearDate()),
					memberInfosMap.get(gameRecord.getId()));
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

	private Map<Integer, String> getIconsMapWithGameParticipantsList(
		List<GameParticipant> gameParticipants) {
		//게임 참여자 리스트로부터 멤버 id 리스트 추출
		List<Integer> memberIds = gameParticipants.stream()
			.map(gameParticipant -> {
				Member member = gameParticipant.getMember();
				if (member != null) {
					return member.getId();
				}
				return -1;
			})
			.filter(id -> id != -1)
			.collect(Collectors.toList());

		//멤버 id 리스트로 [멤버 id, 멤버가 장착한 아이콘 이미지 링크]의 리스트 얻기
		List<Object[]> iconImages = memberItemRepository.findIconImageByMemberIdsIn(memberIds);

		//<멤버의 id - 아이콘아이템이미지링크>로 구성된 맵 생성
		return iconImages
			.stream()
			.collect(Collectors.toMap(
				arr -> (Integer)arr[0],
				arr -> (String)arr[1]
			));
	}
}