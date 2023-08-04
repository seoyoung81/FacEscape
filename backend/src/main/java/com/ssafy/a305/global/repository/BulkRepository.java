package com.ssafy.a305.global.repository;

import java.sql.PreparedStatement;
import java.sql.Types;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ssafy.a305.member.domain.Member;
import com.ssafy.a305.mileage.domain.MileageHistory;
import com.ssafy.a305.record.domain.GameParticipant;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BulkRepository {
	private final JdbcTemplate jdbcTemplate;

	public void gameParticipantBulkInsert(List<GameParticipant> gameParticipants) {
		String sql = "INSERT INTO game_participant (game_record_id, member_id, nickname) values (?, ?, ?)";
		jdbcTemplate.batchUpdate(sql,
			gameParticipants,
			gameParticipants.size(),
			(PreparedStatement ps, GameParticipant gameParticipant) -> {
				ps.setInt(1, gameParticipant.getGameRecord().getId());
				Member member = gameParticipant.getMember();
				if (member == null) {
					ps.setNull(2, Types.INTEGER);
				} else {
					ps.setInt(2, member.getId());
				}
				ps.setString(3, gameParticipant.getNickname());
			});
	}

	public void mileageHistoryBulkInsert(List<MileageHistory> mileageHistories) {
		String sql = "INSERT INTO mileage_history (amount, created_at, member_id) values (?, ?, ?)";
		jdbcTemplate.batchUpdate(sql,
			mileageHistories,
			mileageHistories.size(),
			(PreparedStatement ps, MileageHistory mileageHistory) -> {
				ps.setInt(1, mileageHistory.getAmount());
				ps.setTimestamp(2, mileageHistory.getCreatedAt());
				ps.setInt(3, mileageHistory.getMember().getId());
			});
	}

	public void memberBulkUpdate(List<Member> members) {
		String sql = "UPDATE member SET email = ?, login_type= ?, mileage=?, nickname=?, password=?, recent_login=? WHERE member_id = ?";
		jdbcTemplate.batchUpdate(sql,
			members,
			members.size(),
			(PreparedStatement ps, Member member) -> {
				ps.setString(1, member.getEmail());
				ps.setString(2, String.valueOf(member.getLoginType()));
				ps.setInt(3, member.getMileage());
				ps.setString(4, member.getNickname());
				ps.setString(5, member.getPassword());
				ps.setTimestamp(6, member.getRecentLogin());
				ps.setInt(7, member.getId());
			});
	}

}
