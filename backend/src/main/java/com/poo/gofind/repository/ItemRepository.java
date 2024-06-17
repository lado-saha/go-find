package com.poo.gofind.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.poo.gofind.model.StolenItem;

@Repository
public interface ItemRepository extends JpaRepository<StolenItem, Long> {
    // Additional query methods can be defined here if needed

    /**
     * THis searches a user
     * 
     * @param name
     * @param brand
     * @param serialNumber
     * @param model
     * @param pageable
     * @return
//      */
//     @Query("SELECT * FROM Item i WHERE " +
//             "(LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%')) OR :name IS NULL) AND " +
//             "(LOWER(i.brand) LIKE LOWER(CONCAT('%', :brand, '%')) OR :brand IS NULL) AND " +
//             "(LOWER(i.serialNumber) LIKE LOWER(CONCAT('%', :serialNumber, '%')) OR :serialNumber IS NULL) AND " +
//             "(LOWER(i.model) LIKE LOWER(CONCAT('%', :model, '%')) OR :model IS NULL)")
//     Page<StolenItem> searchItems(
//             @Param("name") String name,
//             @Param("brand") String brand,
//             @Param("serialNumber") String serialNumber,
//             @Param("model") String model,
//             Pageable pageable);

}
