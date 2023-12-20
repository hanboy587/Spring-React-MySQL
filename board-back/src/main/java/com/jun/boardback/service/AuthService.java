package com.jun.boardback.service;

import org.springframework.http.ResponseEntity;

import com.jun.boardback.dto.request.auth.SignUpRequestDto;
import com.jun.boardback.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
