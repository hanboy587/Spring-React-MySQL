package com.jun.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jun.boardback.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    // 쿼리 메서드
    // 레코드 존재 여부
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    boolean existsByTellNumber(String tellNumber);
}
