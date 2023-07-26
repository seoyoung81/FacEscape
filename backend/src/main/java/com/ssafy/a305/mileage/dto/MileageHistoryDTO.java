package com.ssafy.a305.mileage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MileageHistoryDTO {

    private Integer id;
    private Integer member;
    private Boolean isPlus;
    private Integer amount;
    private Timestamp createdAt;




}
