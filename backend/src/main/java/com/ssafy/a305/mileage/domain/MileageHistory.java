package com.ssafy.a305.mileage.domain;

import com.ssafy.a305.member.domain.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity(name = "MileageHistory")
@Getter
@Setter
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

    // 2. 증감 필드를 따로 만드는 게 좋을 것 같다
    //라고 생각했는데 없어도 될 것 같다??
    @ColumnDefault("1")
    @Column(name = "is_plus", nullable = false)
    private Boolean isPlus;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;
}
