package com.jun.boardback.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.jun.boardback.common.ResponseCode;
import com.jun.boardback.common.ResponseMessage;
import com.jun.boardback.dto.object.FavoriteListItem;
import com.jun.boardback.dto.response.ResponseDto;
import com.jun.boardback.repository.resultSet.GetFavoriteListResultSet;

public class GetFavoriteListReponseDto extends ResponseDto {
    
    private List<FavoriteListItem> favoriteList;

    private GetFavoriteListReponseDto(List<GetFavoriteListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.favoriteList = FavoriteListItem.copyList(resultSets);
    }

    private GetFavoriteListReponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<GetFavoriteListReponseDto> success(List<GetFavoriteListResultSet> resultSets) {
        GetFavoriteListReponseDto result = new GetFavoriteListReponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
