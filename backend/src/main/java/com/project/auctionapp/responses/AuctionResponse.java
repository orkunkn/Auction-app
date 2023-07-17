package com.project.auctionapp.responses;

import com.project.auctionapp.entities.Auction;

import lombok.Data;

@Data
public class AuctionResponse {
    
    Long id;
	
	Long userId;
	
	String username;
	
	String title;
	
	String text;

    public AuctionResponse(Auction entity) {
        this.id = entity.getId();
		this.userId = entity.getUser().getId();
		this.username = entity.getUser().getUsername();
		this.title = entity.getTitle();
		this.text = entity.getText();
    }
}
