package com.jun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.jun.boardback.dto.request.auth.SignInRequestDto;
import com.jun.boardback.dto.request.auth.SignUpRequestDto;
import com.jun.boardback.dto.response.auth.SignInResponseDto;
import com.jun.boardback.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    
    // <? super ~> => 부모 형태 모두 받기
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
