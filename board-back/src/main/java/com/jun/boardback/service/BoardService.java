package com.jun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.jun.boardback.dto.request.auth.board.PostBoardRequestDto;
import com.jun.boardback.dto.response.board.PostBoardResponseDto;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
}
