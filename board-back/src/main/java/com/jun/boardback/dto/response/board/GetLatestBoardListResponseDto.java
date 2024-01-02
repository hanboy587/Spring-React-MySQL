package com.jun.boardback.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.jun.boardback.common.ResponseCode;
import com.jun.boardback.common.ResponseMessage;
import com.jun.boardback.dto.object.BoardListItem;
import com.jun.boardback.dto.response.ResponseDto;
import com.jun.boardback.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetLatestBoardListResponseDto extends ResponseDto {
    
    private List<BoardListItem> latestList;

    private GetLatestBoardListResponseDto(List<BoardListViewEntity> boardEntites) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestList = BoardListItem.getList(boardEntites);
    }

    public static ResponseEntity<GetLatestBoardListResponseDto> success(List<BoardListViewEntity> boardEntites) {
        GetLatestBoardListResponseDto result = new GetLatestBoardListResponseDto(boardEntites);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
