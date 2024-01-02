package com.jun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.jun.boardback.dto.response.search.GetPopularListResponseDto;

public interface SearchService {
    
    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
}
