package com.jun.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jun.boardback.entity.BoardEntity;
import com.jun.boardback.repository.resultSet.GetBoardResultSet;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    BoardEntity findByBoardNumber(Integer boardNumber);
    boolean existsByBoardNumber(Integer boardNumber);
    
    //BoardEntity엔 writerNiname이 없으므로 네이티브 쿼리 작성
    @Query(value = 
        "SELECT " +
        "B.board_number AS boardNumber, " +
        "B.title AS title, " +
        "B.content AS content, " +
        "B.write_datetime AS writeDatetime, " +
        "B.writer_email AS writerEmail, " +
        "U.nickname AS writerNickname, " +
        "U.profile_image AS writerProfileImage " +
        "FROM board AS B " +
        "INNER JOIN user AS U " +
        "ON B.writer_email = U.email " +
        "WHERE board_number = ?1",
    nativeQuery = true
    )
    // 위 쿼리의 ?1 은 메서드의 첫번째 매개변수 라는 뜻
    GetBoardResultSet getBoard(Integer boardNumber);
}
