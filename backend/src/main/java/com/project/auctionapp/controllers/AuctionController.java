package com.project.auctionapp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.auctionapp.entities.Auction;
import com.project.auctionapp.requests.AuctionCreateRequest;
import com.project.auctionapp.requests.AuctionUpdateRequest;
import com.project.auctionapp.responses.AuctionResponse;
import com.project.auctionapp.services.AuctionService;

@RestController
@RequestMapping("/auctions")
public class AuctionController {

	private AuctionService auctionService;

	public AuctionController(AuctionService auctionService) {
		this.auctionService = auctionService;
	}

	@PostMapping
	public Auction createOneAuction(@RequestBody AuctionCreateRequest newAuctionRequest) {
		return auctionService.createOneAuction(newAuctionRequest);
	}

	@GetMapping("/{auctionId}")
	public Auction getOneAuction(@PathVariable Long auctionId) {
		return auctionService.getOneAuction(auctionId);
	}

	@GetMapping
	public List<AuctionResponse> getAllAuctions(@RequestParam Optional<Long> userId) {
		return auctionService.getAllAuctions(userId);
	}

	@PutMapping("/{auctionId}")
	public Auction updateOneAuction(@PathVariable Long auctionId, @RequestBody AuctionUpdateRequest updateAuction) {
		return auctionService.updateOneAuction(auctionId, updateAuction);
	}

	@DeleteMapping("/{auctionId}")
	public void deleteOneAuction(@PathVariable Long auctionId) {
		auctionService.deleteOneAuction(auctionId);
	}
}
