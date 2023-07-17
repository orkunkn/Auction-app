package com.project.auctionapp.services;

import java.util.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.auctionapp.entities.Auction;
import com.project.auctionapp.entities.User;
import com.project.auctionapp.repositories.AuctionRepository;
import com.project.auctionapp.requests.AuctionCreateRequest;
import com.project.auctionapp.requests.AuctionUpdateRequest;

@Service
public class AuctionService {
    
    private AuctionRepository auctionRepository;
	private UserService userService;

	public AuctionService(AuctionRepository auctionRepository, UserService userService) {
		this.auctionRepository = auctionRepository;
		this.userService = userService;
	}

	public Auction getOneAuction(Long auctionId) {
		return auctionRepository.findById(auctionId).orElse(null);
	}

	public Auction createOneAuction(AuctionCreateRequest newAuctionRequest) {
		User user = userService.getOneUserById(newAuctionRequest.getUserId());
		if (user == null)
			return null;
		
		Auction newAuction = new Auction();
		newAuction.setId(newAuctionRequest.getId());
		newAuction.setText(newAuctionRequest.getText());
		newAuction.setTitle(newAuctionRequest.getTitle());
		newAuction.setUser(user);
		newAuction.setCategory(newAuctionRequest.getCategory());
		newAuction.setCreateDate(new Date());
		newAuction.setEndDate(newAuctionRequest.getEndDate());
		return auctionRepository.save(newAuction);
	}

    public Auction updateOneAuction(Long auctionId, AuctionUpdateRequest updateAuction) {
		Optional<Auction> auction = auctionRepository.findById(auctionId);
		if (auction.isPresent()) {
			Auction toUpdate = auction.get();
            if (updateAuction.getValue() != null)
                toUpdate.setValue(updateAuction.getValue());
            if (updateAuction.getText() != null)
			    toUpdate.setText(updateAuction.getText());
            if (updateAuction.getTitle() != null)
			    toUpdate.setTitle(updateAuction.getTitle());
			auctionRepository.save(toUpdate);
			return toUpdate;
		}
		return null;
	}

	public void deleteOneAuction(Long auctionId) {
		auctionRepository.deleteById(auctionId);
	}
}
