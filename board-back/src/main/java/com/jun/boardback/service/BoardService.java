package com.jun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.jun.boardback.dto.request.auth.board.PostBoardRequestDto;
import com.jun.boardback.dto.request.auth.board.PostCommentRequestDto;
import com.jun.boardback.dto.response.board.GetBoardResponseDto;
import com.jun.boardback.dto.response.board.GetFavoriteListReponseDto;
import com.jun.boardback.dto.response.board.PostBoardResponseDto;
import com.jun.boardback.dto.response.board.PostCommentResponseDto;
import com.jun.boardback.dto.response.board.PutFavoriteResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
    ResponseEntity<? super GetFavoriteListReponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, String email, Integer boardNumber);
}
