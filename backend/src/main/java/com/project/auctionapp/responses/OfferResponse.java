package com.project.auctionapp.responses;

import com.project.auctionapp.entities.Offer;

import lombok.Data;

@Data
public class OfferResponse {

	Long id;

	Long userId;

	String username;

	Long bid;

	public OfferResponse(Offer entity) {
		this.id = entity.getId();
		this.username = entity.getUser().getUsername();
		this.userId = entity.getUser().getId();
		this.bid = entity.getBid();
	}
}
