package com.ssafy.a305.ranking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a305.ranking.dto.RankingResDTO;
import com.ssafy.a305.ranking.service.RankingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RankingController {
	private final RankingService rankingService;

	@GetMapping("/ranking")
	public ResponseEntity<RankingResDTO> getRanking(@RequestParam Integer stage) {
		return ResponseEntity.ok(rankingService.getRankings(stage));
	}
}
