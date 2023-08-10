package com.ssafy.a305.memberitem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EquippedItemResDTO {
    private List<EquippedItemElementDTO> items;
}
