package com.jun.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jun.boardback.entity.FavoriteEntity;
import com.jun.boardback.entity.primaryKey.FavoritePk;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {
    
}
