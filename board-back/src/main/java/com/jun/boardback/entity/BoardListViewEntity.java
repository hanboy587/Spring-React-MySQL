package com.jun.boardback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "board_list_view")
@Table(name = "board_list_view")
public class BoardListViewEntity {
    
    @Id
    private int boardNumber;
    private String title;
    private String content;
    private String titleImage;
    private int viewCount;
    private int favoriteCount;
    private int commentCount;
    private String writeDateTime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImage;
}
