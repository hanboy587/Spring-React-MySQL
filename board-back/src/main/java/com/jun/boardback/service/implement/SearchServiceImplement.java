package com.jun.boardback.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jun.boardback.dto.response.ResponseDto;
import com.jun.boardback.dto.response.search.GetPopularListResponseDto;
import com.jun.boardback.repository.SearchLogRepsitory;
import com.jun.boardback.repository.resultSet.GetPopularListResultSet;
import com.jun.boardback.service.SearchService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchService {
    
    private final SearchLogRepsitory searchLogRepsitory;
    
    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {
        
        List<GetPopularListResultSet> resultSets = new ArrayList<>();


        try {

            resultSets = searchLogRepsitory.getPopularList();
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetPopularListResponseDto.success(resultSets);
    }
    
}
