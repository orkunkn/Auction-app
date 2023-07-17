package com.project.auctionapp.requests;

import lombok.Data;

@Data
public class OfferCreateRequest {

    Long id;

    Long userId;

    Long auctionId;

    Long bid;
}
