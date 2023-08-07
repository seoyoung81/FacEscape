package com.ssafy.a305.memberitem.dto;

import com.ssafy.a305.item.dto.ItemElementDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PurchasedItemResDTO {
    private List<PurchasedItemElementDTO> items;
}
