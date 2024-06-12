package com.poo.gofind.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poo.gofind.model.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    // Additional query methods can be defined here if needed
}

