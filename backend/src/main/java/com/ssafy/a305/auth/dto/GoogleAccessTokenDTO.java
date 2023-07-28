package com.ssafy.a305.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class GoogleAccessTokenDTO {
	private String access_token;
	private int expires_in;
	private String scope;
	private String token_type;
	private String id_token;
}
