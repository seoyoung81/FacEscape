package com.ssafy.a305.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ValidationErrorDTO {
	private String field;
	private String errorMessage;
}
