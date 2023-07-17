package com.project.auctionapp.requests;

import lombok.Data;

@Data
public class AuctionUpdateRequest {
    
    Long value;

    String title;
	
	String text;
}
