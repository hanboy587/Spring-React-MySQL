package com.jun.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jun.boardback.entity.SearchLogEntity;

@Repository
public interface SearchLogRepsitory extends JpaRepository<SearchLogEntity, Integer> {
    
}
