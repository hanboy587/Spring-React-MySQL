package com.jun.boardback.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jun.boardback.dto.request.auth.board.PostBoardRequestDto;
import com.jun.boardback.dto.response.ResponseDto;
import com.jun.boardback.dto.response.board.PostBoardResponseDto;
import com.jun.boardback.entity.BoardEntity;
import com.jun.boardback.entity.ImageEntity;
import com.jun.boardback.repository.BoardRepository;
import com.jun.boardback.repository.ImageRepository;
import com.jun.boardback.repository.UserRepository;
import com.jun.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    
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
    
}
