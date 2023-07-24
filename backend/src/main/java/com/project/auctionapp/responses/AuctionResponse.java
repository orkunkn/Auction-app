package com.project.auctionapp.responses;

import java.util.Date;

import com.project.auctionapp.entities.Auction;

import lombok.Data;

@Data
public class AuctionResponse {

	Long id;

	Long userId;

	Long value;

	String username;

	String title;

	String text;

	String category;

	Date endDate;

	public AuctionResponse(Auction entity) {
		this.id = entity.getId();
		this.userId = entity.getUser().getId();
		this.value = entity.getValue();
		this.username = entity.getUser().getUsername();
		this.title = entity.getTitle();
		this.text = entity.getText();
		this.category = entity.getCategory();
		this.endDate = entity.getEndDate();
	}
}
