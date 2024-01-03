package com.jun.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jun.boardback.dto.request.auth.SignInRequestDto;
import com.jun.boardback.dto.request.auth.SignUpRequestDto;
import com.jun.boardback.dto.response.ResponseDto;
import com.jun.boardback.dto.response.auth.SignInResponseDto;
import com.jun.boardback.dto.response.auth.SignUpResponseDto;
import com.jun.boardback.entity.UserEntity;
import com.jun.boardback.provider.JwtProvider;
import com.jun.boardback.repository.UserRepository;
import com.jun.boardback.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    // Sign Up 로직
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        
        try {
            // table 제약 조건 체크
            String email = dto.getEmail();
            boolean existedEmail = userRepository.existsByEmail(email);
            if (existedEmail) return SignUpResponseDto.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if (existedNickname) return SignUpResponseDto.duplicateNickname();

            String tellNumber = dto.getTellNumber();
            boolean existedtellNumber = userRepository.existsByTellNumber(tellNumber);
            if (existedtellNumber) return SignUpResponseDto.duplicateTellNumber();

            // 비밀번호 암호화
            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            // database 저장
            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();
    }


    // Sign In 로직
    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
        
        String token = null;
        
        try {

            String email = dto.getEmail();
            UserEntity userEntity = userRepository.findByEmail(email);
            // email 못 찾을 시 로그인 실패 반환
            if (userEntity == null) return SignInResponseDto.signInFailed();

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            // 패스워드 <> 암호화 패스워드 인코딩 판별
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            // 패스워드 불일치 시 return
            if (!isMatched) return SignInResponseDto.signInFailed();

            // token 생성
            token = jwtProvider.create(email);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token);
    }
    
}
