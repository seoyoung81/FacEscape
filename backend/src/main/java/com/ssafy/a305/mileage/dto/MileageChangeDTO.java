package com.ssafy.a305.mileage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

//마일리지 히스토리를 쏜다 -> 마일리지를 amount만큼 증감한다
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MileageChangeDTO {

    private Integer member;
    private Integer amount;




}
