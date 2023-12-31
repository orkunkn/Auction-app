package com.project.auctionapp.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.auctionapp.entities.Auction;
import com.project.auctionapp.entities.User;
import com.project.auctionapp.repositories.AuctionRepository;
import com.project.auctionapp.requests.AuctionCreateRequest;
import com.project.auctionapp.requests.AuctionUpdateRequest;
import com.project.auctionapp.responses.AuctionResponse;

import redis.clients.jedis.JedisPooled;

@Service
public class AuctionService {

	private AuctionRepository auctionRepository;
	private UserService userService;
	private JedisPooled jedis = new JedisPooled("localhost", 6379);

	public AuctionService(AuctionRepository auctionRepository, UserService userService) {
		this.auctionRepository = auctionRepository;
		this.userService = userService;
	}

	public Auction getOneAuction(Long auctionId) {
		return auctionRepository.findById(auctionId).orElse(null);
	}

	public List<AuctionResponse> getAllAuctions(Optional<Long> userId) {
		List<Auction> list;
		if (userId.isPresent())
			list = auctionRepository.findByUserId(userId.get());
		else
			list = auctionRepository.findAll();

		return list.stream().map(p -> {
			return new AuctionResponse(p);
		}).collect(Collectors.toList());
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
		newAuction.setValue(newAuctionRequest.getValue());
		Auction result = auctionRepository.save(newAuction);
		jedis.set(result.getId().toString(), newAuctionRequest.getValue().toString());
		return result;
	}

	public Auction updateOneAuction(Long auctionId, AuctionUpdateRequest updateAuction) {
		Optional<Auction> auction = auctionRepository.findById(auctionId);
		if (auction.isPresent()) {
			Auction toUpdate = auction.get();
			if (updateAuction.getValue() != null && updateAuction.getValue() > Integer.parseInt(jedis.get(auctionId.toString())))
			{
				toUpdate.setValue(updateAuction.getValue());
				jedis.set(toUpdate.getId().toString(), updateAuction.getValue().toString());
			}
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
