package com.project.auctionapp.services;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.project.auctionapp.entities.Auction;
import com.project.auctionapp.entities.Offer;
import com.project.auctionapp.entities.User;
import com.project.auctionapp.repositories.AuctionRepository;
import com.project.auctionapp.repositories.OfferRepository;
import com.project.auctionapp.requests.OfferCreateRequest;

@Service
public class OfferService {

    UserService userService;
    AuctionService auctionService;
    OfferRepository offerRepository;
    AuctionRepository auctionRepository;

    public Offer getOneOffer(Long offerId) {
        return offerRepository.findById(offerId).orElse(null);
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
            newOffer.setCreateDate(new Date());
            return offerRepository.save(newOffer);
        } else
            return null;
    }

    public void deleteOneOffer(long offerId) {
        offerRepository.deleteById(offerId);
    }

}
