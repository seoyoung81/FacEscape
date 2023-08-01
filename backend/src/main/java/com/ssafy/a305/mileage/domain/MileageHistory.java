package com.ssafy.a305.mileage.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.ssafy.a305.member.domain.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "MileageHistory")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MileageHistory {

	@Id
	@Column(name = "mileage_history_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer mileageHistoryId;

	@ManyToOne(fetch = FetchType.LAZY)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "member_id")
	private Member member;

	@Column(name = "amount", nullable = false)
	private Integer amount;

	@Column(name = "created_at", nullable = false)
	private Timestamp createdAt;
}
