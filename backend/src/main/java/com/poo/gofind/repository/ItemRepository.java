package com.poo.gofind.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poo.gofind.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // Additional query methods can be defined here if needed
    Page<Item> findByNameContainingOrBrandContainingOrSerialNumberContainingOrModelContaining(
            String name, String brand, String serialNumber, String model, Pageable pageable);
}
