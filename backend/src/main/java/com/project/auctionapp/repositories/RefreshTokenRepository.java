package com.project.auctionapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.auctionapp.entities.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	RefreshToken findByUserId(Long userId);
}
