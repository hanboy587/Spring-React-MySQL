package com.jun.boardback.controller;

import org.springframework.web.bind.annotation.RestController;

import com.jun.boardback.dto.request.auth.SignInRequestDto;
import com.jun.boardback.dto.request.auth.SignUpRequestDto;
import com.jun.boardback.dto.response.auth.SignInResponseDto;
import com.jun.boardback.dto.response.auth.SignUpResponseDto;
import com.jun.boardback.service.AuthService;

import lombok.RequiredArgsConstructor;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 회원가입
    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(@RequestBody @Valid SignUpRequestDto requestBody) {

        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);

        return response;
    }

    // 로그인
    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(@RequestBody @Valid SignInRequestDto requestBody) {
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    } 
    
}
