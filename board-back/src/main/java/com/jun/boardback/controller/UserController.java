package com.jun.boardback.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jun.boardback.dto.request.user.PatchNicknameRequestDto;
import com.jun.boardback.dto.request.user.PatchProfileImageRequestDto;
import com.jun.boardback.dto.response.user.GetSignInUserResponseDto;
import com.jun.boardback.dto.response.user.GetUserResponseDto;
import com.jun.boardback.dto.response.user.PatchNicknameResponseDto;
import com.jun.boardback.dto.response.user.PatchProfileImageResponseDto;
import com.jun.boardback.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    // @AuthenticationPrincipal => 인증 후 인증 사용자 받기(/filter/JwtAuthenticationFilter.java의 UsernamePasswordAuthenticationToken(email) 가져옴)
    @GetMapping("")
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(@AuthenticationPrincipal String email) {
        
        ResponseEntity<? super GetSignInUserResponseDto> response = userService.getSignInUser(email);
        return response;
    }

    @GetMapping("/{email}")
    public ResponseEntity<? super GetUserResponseDto> getUser(@PathVariable("email") String email) {

        ResponseEntity<? super GetUserResponseDto> response = userService.getUser(email);
        return response;
    }

    // 닉네임 수정
    @PatchMapping("/nickname")
    public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(
        @RequestBody @Valid PatchNicknameRequestDto requestBody,
        @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super PatchNicknameResponseDto> response = userService.patchNickname(requestBody, email);
        return response;
    }

    @PatchMapping("/profile-image")
    public ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(
        @RequestBody @Valid PatchProfileImageRequestDto requestBody,
        @AuthenticationPrincipal String profileImage
    ) {
        ResponseEntity<? super PatchProfileImageResponseDto> response = userService.patchProfileImage(requestBody, profileImage);
        return response;
    }


}
