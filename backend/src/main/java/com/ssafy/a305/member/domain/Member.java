package com.ssafy.a305.member.domain;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PreRemove;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.ssafy.a305.record.domain.GameParticipant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "Member")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class Member {

	@Id
	@Column(name = "member_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "email", length = 320, nullable = false)
	private String email;

	@Column(name = "password", length = 512, nullable = false)
	private String password;

	@Column(name = "nickname", length = 8, nullable = false)
	private String nickname;

	@Column
	@ColumnDefault("0")
	private Integer mileage;

	@Column(length = 16, nullable = false)
	@Enumerated(EnumType.STRING)
	private LoginType loginType;

	@Column(name = "recent_login")
	private Timestamp recentLogin;

	// 양방향 매핑
	@OneToMany(mappedBy = "member")
	private List<GameParticipant> participants = new ArrayList<>();

	public void updateNickname(String nickname) {
		this.nickname = nickname;
	}

	public void updatePassword(String password) {
		this.password = password;
	}

	public void updateMileage(Integer mileage) {
		this.mileage = mileage;
	}

	public void updateRecentLogin() {
		this.recentLogin = new Timestamp(System.currentTimeMillis());
	}

	@PreRemove
	public void preRemove() {
		System.out.println("22");
		List<GameParticipant> gameParticipants = this.getParticipants();
		for (GameParticipant participant : gameParticipants) {
			participant.deleteMember();
		}
		System.out.println("33");
	}
}
