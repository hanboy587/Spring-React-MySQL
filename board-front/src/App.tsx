import React, { useState } from 'react';
import './App.css';
import { commentListMock, favoriteListMock, latestBoardListMock, top3BoardListMock } from 'mocks';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/commentItem';
import FavoriteItem from 'components/favoriteItem';
import InputBox from 'components/inputBox';

function App() {

  const [value, setValue] = useState<string>('');

  return (
    <>
      {/* 게시물 리스트 */}
      {/* {latestBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem} />)} */}

      {/* 탑 3 리스트 */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
        {top3BoardListMock.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}
      </div> */}

      {/* 댓글 리스트 */}
      {/* <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {commentListMock.map(commentListItem => <CommentItem commentListItem={commentListItem} />)}
      </div> */}

      {/* 좋아요 리스트 */}
      {/* <div style={{ display: 'flex', columnGap: '30px', rowGap: '20px' }}>
        {favoriteListMock.map(favoriteListItem => <FavoriteItem favoriteListItem={favoriteListItem} />)}
      </div> */}

      {/* 입력폼 */}
      <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={true} setValue={setValue} message='aaa' />
    </>
  );
}

export default App;
