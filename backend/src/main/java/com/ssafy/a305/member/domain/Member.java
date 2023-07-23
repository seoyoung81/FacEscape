package com.ssafy.a305.member.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity(name="Member")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email", length=320, nullable = false)
    private String email;

    @Column(name = "password", length=512, nullable = false)
    private String password;

    @Column(name = "nickname", length=8, nullable = false)
    private String nickname;

    @Column
    @ColumnDefault("0")
    private Integer mileage;

    @Column(length = 16, nullable = false)
    @Enumerated(EnumType.STRING)
    private LoginType loginType;

    @Column(name = "recent_login")
    private Timestamp recentLogin;
}
