package com.poo.gofind.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poo.gofind.model.GoUser;

@Repository
public interface GoUserRepository extends JpaRepository<GoUser, String> {
    Page<GoUser> findByNameIgnoreCaseContainingOrEmailIgnoreCaseContainingOrPhoneIgnoreCaseContaining(
            String name, String email, String phone, Pageable pageable);

    GoUser findByEmail(String email);

}
