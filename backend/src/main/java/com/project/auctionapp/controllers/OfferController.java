package com.project.auctionapp.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.auctionapp.entities.Offer;
import com.project.auctionapp.requests.OfferCreateRequest;
import com.project.auctionapp.services.OfferService;

@RestController
@RequestMapping("/offers")
public class OfferController {

	private OfferService offerService;

	public OfferController(OfferService offerService) {
		this.offerService = offerService;
	}
	
    @GetMapping("/{offerId}")
	public Offer getOneOffer(@PathVariable Long offerId) {
		return offerService.getOneOffer(offerId);
	}

	@PostMapping
	public Offer createOneOffer(@RequestBody OfferCreateRequest request) {
		return offerService.createOneOffer(request);
	}
	
	@DeleteMapping("/{offerId}")
	public void deleteOneOffer(@PathVariable long offerId) {
		offerService.deleteOneOffer(offerId);
	}
}
