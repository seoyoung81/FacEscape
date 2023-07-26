package com.ssafy.a305.mileage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MileageChangeDTO {

    private Integer member;
    private Integer amount;

}
