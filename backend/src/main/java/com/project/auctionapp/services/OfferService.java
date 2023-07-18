package com.project.auctionapp.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.auctionapp.entities.Auction;
import com.project.auctionapp.entities.Offer;
import com.project.auctionapp.entities.User;
import com.project.auctionapp.repositories.AuctionRepository;
import com.project.auctionapp.repositories.OfferRepository;
import com.project.auctionapp.requests.OfferCreateRequest;
import com.project.auctionapp.responses.OfferResponse;

@Service
public class OfferService {

    UserService userService;
    AuctionService auctionService;
    OfferRepository offerRepository;
    AuctionRepository auctionRepository;

    public OfferService(UserService userService, AuctionService auctionService, OfferRepository offerRepository,
            AuctionRepository auctionRepository) {
        this.userService = userService;
        this.auctionService = auctionService;
        this.offerRepository = offerRepository;
        this.auctionRepository = auctionRepository;
    }

    public Offer getOneOffer(Long offerId) {
        return offerRepository.findById(offerId).orElse(null);
    }

    public List<OfferResponse> getAllOffersWithParam(Optional<Long> userId, Optional<Long> auctionId) {
        List<Offer> offers;
        if (userId.isPresent() && auctionId.isPresent()) {
            offers = offerRepository.findByUserIdAndAuctionId(userId.get(), auctionId.get());
        } else if (userId.isPresent()) {
            offers = offerRepository.findByUserId(userId.get());
        } else if (auctionId.isPresent()) {
            offers = offerRepository.findByAuctionId(auctionId.get());
        } else
            offers = offerRepository.findAll();
        return offers.stream().map(offer -> new OfferResponse(offer)).collect(Collectors.toList());
    }

    public Offer createOneOffer(OfferCreateRequest request) {
        User user = userService.getOneUserById(request.getUserId());
        Auction auction = auctionService.getOneAuction(request.getAuctionId());

        if (user != null && auction != null) {
            Offer newOffer = new Offer();
            newOffer.setId(request.getId());
            newOffer.setAuction(auction);
            newOffer.setUser(user);
            newOffer.setBid(request.getBid());
            return offerRepository.save(newOffer);
        } else
            return null;
    }

    public void deleteOneOffer(long offerId) {
        offerRepository.deleteById(offerId);
    }

}
