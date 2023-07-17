package com.project.auctionapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.auctionapp.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByUsername(String username);
}
