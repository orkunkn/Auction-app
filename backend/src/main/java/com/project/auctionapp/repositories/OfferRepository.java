package com.project.auctionapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.auctionapp.entities.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {

	List<Offer> findByUserIdAndAuctionId(Long userId, Long auctionId);

	List<Offer> findByUserId(Long userId);

	List<Offer> findByAuctionId(Long auctionId);
}
