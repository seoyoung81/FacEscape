package com.ssafy.a305.mileage.domain;

import com.ssafy.a305.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

// 1. name을 Mileage라고 해야하나 MileageHistory라고 해야하나
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
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;
}
