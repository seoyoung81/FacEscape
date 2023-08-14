package com.ssafy.a305.item.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "Item")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Item {

	@Id
	@Column(name = "item_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_type_id")
	private ItemType itemType;

	@Column(name = "name", nullable = false, length = 32)
	private String name;

	@Column(name = "image", nullable = false, length = 2048)
	private String image;

	@Column(name = "price", nullable = false)
	private Integer price;
}
