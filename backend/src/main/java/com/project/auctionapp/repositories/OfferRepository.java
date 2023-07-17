package com.project.auctionapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.auctionapp.entities.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findByAuctionId(Long auctionId);
}
