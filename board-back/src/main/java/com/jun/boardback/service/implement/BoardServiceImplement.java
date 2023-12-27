package com.jun.boardback.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jun.boardback.dto.request.auth.board.PostBoardRequestDto;
import com.jun.boardback.dto.request.auth.board.PostCommentRequestDto;
import com.jun.boardback.dto.response.ResponseDto;
import com.jun.boardback.dto.response.board.GetBoardResponseDto;
import com.jun.boardback.dto.response.board.GetFavoriteListReponseDto;
import com.jun.boardback.dto.response.board.PostBoardResponseDto;
import com.jun.boardback.dto.response.board.PostCommentResponseDto;
import com.jun.boardback.dto.response.board.PutFavoriteResponseDto;
import com.jun.boardback.entity.BoardEntity;
import com.jun.boardback.entity.CommentEntity;
import com.jun.boardback.entity.FavoriteEntity;
import com.jun.boardback.entity.ImageEntity;
import com.jun.boardback.repository.BoardRepository;
import com.jun.boardback.repository.CommentRepository;
import com.jun.boardback.repository.FavoriteRepository;
import com.jun.boardback.repository.ImageRepository;
import com.jun.boardback.repository.UserRepository;
import com.jun.boardback.repository.resultSet.GetBoardResultSet;
import com.jun.boardback.repository.resultSet.GetFavoriteListResultSet;
import com.jun.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final FavoriteRepository favoriteRepository;
    private final CommentRepository commentRepository;

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();

        try {

            resultSet = boardRepository.getBoard(boardNumber);
            if (resultSet == null) return GetBoardResponseDto.noExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increasViewCount();
            boardRepository.save(boardEntity);


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardResponseDto.success(resultSet, imageEntities);
    }
    


    
    // 게시물 등록
    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
        
        try {

            // email 존재 여부
            boolean existedEmail = userRepository.existsByEmail(email);
            if (!existedEmail) return PostBoardResponseDto.notExistUser();

            // board 생성
            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            // image table
            int boardNumber = boardEntity.getBoardNumber();
            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for (String image: boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }
            imageRepository.saveAll(imageEntities);

            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardResponseDto.success();
    }



    // 게시물 좋아요
    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {

        try {
            
            boolean existedUser = userRepository.existsByEmail(email);
            if (!existedUser) return PutFavoriteResponseDto.noExistUser();

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
            if (favoriteEntity == null) {
                favoriteEntity = new FavoriteEntity(email, boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaseFavoriteCount();
            } else {
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaseFavoritCount();
            }

            boardRepository.save(boardEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PutFavoriteResponseDto.success();
    }



    // 좋아요 리스트
    @Override
    public ResponseEntity<? super GetFavoriteListReponseDto> getFavoriteList(Integer boardNumber) {

        List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

        try {

            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if (!existedBoard) return GetFavoriteListReponseDto.noExistBoard();

            resultSets = favoriteRepository.GetFavoriteList(boardNumber);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return GetFavoriteListReponseDto.success(resultSets);
    }



    // 댓글 저장
    @Override
    public ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, String email, Integer boardNumber) {
        
        try {

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return PostCommentResponseDto.noExistBoard();

            boolean exsitedUser = userRepository.existsByEmail(email);
            if (!exsitedUser) return PostCommentResponseDto.noExistUser();

            CommentEntity commentEntity = new CommentEntity(dto, email, boardNumber);
            commentRepository.save(commentEntity);

            boardEntity.increaseCommentCount();
            boardRepository.save(boardEntity);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return PostCommentResponseDto.success();
    }

    
}
