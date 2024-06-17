package com.poo.gofind.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poo.gofind.model.SearchTag;

public interface SearchTagRepository extends JpaRepository<SearchTag, Long> {

}
