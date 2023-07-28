package com.ssafy.a305.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GoogleUserInfoDTO {
	private String id;
	private String email;
	private boolean verified_email;
	private String name;
	private String given_name;
	private String picture;
	private String locale;

}
