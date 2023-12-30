import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { Board, CommentListItem, FavoriteListItem } from 'types/interface'
import { boardMock, commentListMock, favoriteListMock } from 'mocks'
import FavoriteItem from 'components/favoriteItem'
import CommentItem from 'components/commentItem'
import Pagination from 'components/Pagination'
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { useLoginuserStore } from 'stores'
import { useNavigate, useParams } from 'react-router-dom'
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant'
import { getBoardRequest, getCommentListRequest, getFavoriteListRequest, increaseViewCountRequest } from 'apis'
import GetBoardResponseDto from 'apis/response/board/get-board.response.dto'
import { ResponseDto } from 'apis/response'
import { GetCommentListResponseDto, GetFavoriteListReponseDto, IncreaseViewCountResponseDto } from 'apis/response/board'
import dayjs from 'dayjs';

// component: 게시물 상세 컴포넌트 //
export default function BoardDetail() {

  // state: 게시물 번호 path variable 상태 //
  const { boardNumber } = useParams();

  // state: login user 상태 //
  const { loginUser } = useLoginuserStore();

  // function: navivator //
  const navigator = useNavigate();

  // function: increaseViewCountResponse //
  const increaseViewCountResponse = (responseBody: IncreaseViewCountResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'DBE') alert('데이터 베이스 오류입니다.');
  }

  // component: board detail 상단 컴포넌트 //
  const BoardDetailTop = () => {

    // state: 작성자 여부 상태 //
    const [isWriter, setIsWriter] = useState<boolean>(false);

    // state: board 상태 //
    const [board, setBoard] = useState<Board | null>(null);

    // state: more button //
    const [showMore, setShowMore] = useState<boolean>(false);

    // function: writeDate format 변경 //
    const getWriteDatetimeFormat = () => {
      if (!board) return null;
      const date = dayjs(board.writeDateTime);
      return date.format('YYYY. MM. DD.');
    }

    // function: get board response //
    const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return ;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') {
        navigator(MAIN_PATH());
        return;
      }

      // board 불러오기
      const board: Board = {...responseBody as GetBoardResponseDto};
      setBoard(board);

      // loginUser 판별 및 작성자 판별(수정, 삭제 접근 제한)
      if (!loginUser) {
        setIsWriter(false);
        return;
      }
      const isWriter =  loginUser.email === board.writerEmail;
      setIsWriter(isWriter);
    }

    // // function: delete board response //
    // const deleteBoardResponse = (responseBody: DeleteBoard)

    // event handler: nickname click 이벤트 처리 //
    const onNicknameClickHandler = () => {
      if (!board) return;
      navigator(USER_PATH(board.writerEmail));
    }
    
    // event handler: more buuton click 이벤트 처리 //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    }
    
    // event handler: update button click 이벤트 처리 //
    const onUpdateButtonClickHandler = () => {
      // if (!board) return;
      if (!board || !loginUser) return;
      if (loginUser.email !== board.writerEmail) return;
      navigator(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(board.boardNumber));
    }
    
    // event handler: delete button click 이벤트 처리 //
    const onDeleteButtonClickHandler = () => {
      if (!board || !loginUser) return;
      if (loginUser.email !== board.writerEmail) return;
      navigator(MAIN_PATH());
    }

    // effect: 게시물 번호 path variable 바뀔 때 마다 //
    useEffect(() => {
      if (!boardNumber) {
        navigator(MAIN_PATH());
        return;
      }
      getBoardRequest(boardNumber).then(getBoardResponse);
    }, [boardNumber])

    
    // render: board detail 상단 렌더링 //
    if (!board) return <></>
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{board.title}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image' style={{ backgroundImage: `url(${board?.writerProfileImage ? board.writerProfileImage : defaultProfileImage})` }}></div>
              <div className='board-detail-writer-nickname' onClick={onNicknameClickHandler}>{board.writerNickname}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{getWriteDatetimeFormat()}</div>
            </div>
            {isWriter &&
            <div className='icon-button' onClick={onMoreButtonClickHandler}>
              <div className='icon more-icon'></div>
            </div>
            }
            {showMore &&
              <div className='board-detail-more-box'>
                <div className='board-detail-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
                <div className='divider'></div>
                <div className='board-detail-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
              </div>
            }
          </div> 
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          <div className='board-detail-main-text'>{board.content}</div>
          {board.boardImageList.map(image => <img className='board-detail-main-image' src={image} />)}
        </div>
      </div>
    )
  }
  
  // component: board detail 하단 컴포넌트 //
  const BoardDetailBottom = () => {

    // state: comment textarea 참조 상태 //
    const commentRef = useRef<HTMLTextAreaElement | null>(null);

    // state: favorite list 상태 //
    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    // state: comment list 상태 //
    const [commentList, setCommentList] = useState<CommentListItem[]>([]);
    // state: 좋아요 상태 //
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    // state: show favorite 상태 //
    const [showFavorite, setShowFavorite] = useState<boolean>(true);
    // state: show comment 상태 //
    const [showComment, setShowComment] = useState<boolean>(true);
    // state: comment 상태 //
    const [comment, setComment] = useState<string>('');

    // function: getFavoriteListResponse //
    const getFavoriteListResponse = (responseBody: GetFavoriteListReponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code !== 'SU') return;

      const { favoriteList } = responseBody as GetFavoriteListReponseDto;
      setFavoriteList(favoriteList);

      if (!loginUser) {
        setIsFavorite(false);
        return;
      } 
      const isFavorite = favoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1;
      setIsFavorite(isFavorite);
    }

    // function: getCommentListResponse //
    const getCommentListResponse = (responseBody: GetCommentListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code !== 'SU') return;

      const { commentList } = responseBody as GetCommentListResponseDto;
      setCommentList(commentList);
    }

    // event handler: favorite click 이벤트 처리 //
    const onFavoriteClickHandler = () => {
      setIsFavorite(!isFavorite);
    }

    // event handler: show favorite click 이벤트 처리 //
    const onShowFavoriteClickHandler = () => {
      setShowFavorite(!showFavorite);
    }

    // event handler: show comment click 이벤트 처리 //
    const onShowCommentClickHandler = () => {
      setShowComment(!showComment);
    }

    // event handler: comment 작성 click 이벤트 처리 //
    const onCommentSubmitButtonClickHandler = () => {
      // 버튼이 disable로 보이지만 클릭은 되므로 방지 //
      if (!comment) return;
      alert('!!');
    }

    // event handler: comment change 이벤트 처리 //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);

      if (!commentRef.current) return;
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }

    // effect: 게시물 번호 path variable 바뀔 때 마다 //
    useEffect(() => {
      if (!boardNumber) return;
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
      getCommentListRequest(boardNumber).then(getCommentListResponse);
    },[boardNumber])
    
    // render: board detail 하단 렌더링 //
    return (
      <div id='board-detail-bottom'>
        <div className='board-detail-bottom-button-box'>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button'  onClick={onFavoriteClickHandler}>
              {isFavorite ?
                <div className='icon favorite-fill-icon'></div>
                :
                <div className='icon favorite-light-icon'></div>
              }
            </div>
            <div className='board-detail-bottom-button-text'>{`좋아요 ${favoriteList.length}`}</div>
            <div className='icon-button' onClick={onShowFavoriteClickHandler}>
              {showFavorite ?
                <div className='icon up-light-icon'></div>
                :
                <div className='icon down-light-icon'></div>
              
              }
            </div>
          </div>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button'>
              <div className='icon comment-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`댓글 ${commentList.length}`}</div>
            <div className='icon-button' onClick={onShowCommentClickHandler}>
              {showComment ?
                  <div className='icon up-light-icon'></div>
                  :
                  <div className='icon down-light-icon'></div>
                
                }
            </div>
          </div>
        </div>
        {showFavorite &&
        <div className='board-detail-bottom-favorite-box'>
          <div className='board-detail-bottom-favorite-container'>
            <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{favoriteList.length}</span></div>
            <div className='board-detail-bottom-favorite-contents'>
              {favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
            </div>
          </div> 
        </div>
        }
        {showComment && 
         
        <div className='board-detail-bottom-comment-box'>
          <div className='board-detail-bottom-comment-container'>
            <div className='board-detail-bottom-comment-title'>{'댓글 '}<span className='emphasis'>{commentList.length}</span></div>
            <div className='board-detail-bottom-comment-list-container'>
              {commentList.map(item => <CommentItem commentListItem={item} />)}
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-bottom-comment-pagination-box'>
            <Pagination />
          </div>
          {loginUser !== null && 
          <div className='board-detail-bottom-comment-input-box'>
            <div className='board-detail-bottom-comment-input-container'>
              <textarea ref={commentRef} className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' value={comment} onChange={onCommentChangeHandler} />
              <div className='board-detail-bottom-comment-button-box'>
                <div className={comment === '' ? 'disable-button' : 'black-button'} onClick={onCommentSubmitButtonClickHandler}>{'댓글작성'}</div>
              </div>
            </div>
          </div>
          }
        </div>
        }
      </div>
    )
  }

  // effect: 게시물 번호 path variable이 바뀔 때 마다 viewCount 증가 //
  let effectFlag = true;
  useEffect(() => {
    if (!boardNumber) return;
    if (effectFlag) {
      effectFlag = false;
      return;
    }

    increaseViewCountRequest(boardNumber).then(increaseViewCountResponse)
  }, [boardNumber])

  // render: 게시물 상세 컴포넌트 렌더링 //
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}
