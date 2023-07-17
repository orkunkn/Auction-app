package com.project.auctionapp.requests;

import java.util.Date;

import lombok.Data;

@Data
public class AuctionCreateRequest {
    
    Long id;

    Long userId;

    Long value;

    String title;

    String text;

    String category;

    Date endDate;
}
