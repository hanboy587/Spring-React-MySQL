package com.jun.boardback.dto.response.board;

import java.util.List;

import com.jun.boardback.common.ResponseCode;
import com.jun.boardback.common.ResponseMessage;
import com.jun.boardback.dto.response.ResponseDto;

import lombok.Getter;


@Getter
public class GetBoardResponseDto extends ResponseDto {

    private int boardNumber;
    private String title;
    private String content;
    private List<String> boardImageList;
    private String writeDateTime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImage;

    private GetBoardResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

}
