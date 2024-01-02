package com.jun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.jun.boardback.dto.request.auth.board.PatchBoardRequestDto;
import com.jun.boardback.dto.request.auth.board.PostBoardRequestDto;
import com.jun.boardback.dto.request.auth.board.PostCommentRequestDto;
import com.jun.boardback.dto.response.board.DeleteBoardResponseDto;
import com.jun.boardback.dto.response.board.GetBoardResponseDto;
import com.jun.boardback.dto.response.board.GetCommentListResponseDto;
import com.jun.boardback.dto.response.board.GetFavoriteListReponseDto;
import com.jun.boardback.dto.response.board.GetLatestBoardListResponseDto;
import com.jun.boardback.dto.response.board.GetTop3BoardListResponseDto;
import com.jun.boardback.dto.response.board.IncreaseViewCountResponseDto;
import com.jun.boardback.dto.response.board.PatchBoardResponseDto;
import com.jun.boardback.dto.response.board.PostBoardResponseDto;
import com.jun.boardback.dto.response.board.PostCommentResponseDto;
import com.jun.boardback.dto.response.board.PutFavoriteResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);
    ResponseEntity<? super GetFavoriteListReponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();
    ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList();
    
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, String email, Integer boardNumber);
    
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
    ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email);

    ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);

    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);
}
