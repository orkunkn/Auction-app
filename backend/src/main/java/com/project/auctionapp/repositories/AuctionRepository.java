package com.project.auctionapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.auctionapp.entities.Auction;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

    List<Auction> findByUserId(Long userId);
}
