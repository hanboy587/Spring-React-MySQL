package com.jun.boardback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jun.boardback.entity.SearchLogEntity;
import com.jun.boardback.repository.resultSet.GetPopularListResultSet;

@Repository
public interface SearchLogRepsitory extends JpaRepository<SearchLogEntity, Integer> {
    
    @Query(
        value=
        "SELECT search_word, count(search_word) AS count " +
        "FROM search_log " +
        "WHERE relation IS FALSE " +
        "GROUP BY search_word " +
        "ORDER BY count DESC " +
        "LIMIT 15 ",
        nativeQuery = true
    )
    List<GetPopularListResultSet> getPopularList();
}
