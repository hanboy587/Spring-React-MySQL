import React, { useState } from 'react';
import './App.css';
import { commentListMock, favoriteListMock, latestBoardListMock, top3BoardListMock } from 'mocks';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/commentItem';
import FavoriteItem from 'components/favoriteItem';
import InputBox from 'components/inputBox';
import Footer from 'layouts/footer';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';


// component: Application 컴포넌트 //
function App() {
  
  
// render: Application 컴포넌트 렌더링 //
// description: 메인 : '/' -Main //
// description: 로그인, 회원가입 : '/auth' - Authentication //
// description: 검색 : '/search/:searchWord' - Search //
// description: 유저 : 'user/:userEmail' - User //
//
// description: 게시물 상세보기 : '/board/detail/:boardNumber' - BoardDetail //
// description: 게시물 작성하기 : '/board/write' - BoardWrite //
// description: 게시물 수정하기 : '/board/update/:boardNumber' - BoardUpdate //
//
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
      {/* <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={true} setValue={setValue} message='aaa' /> */}

      {/* Footer */}
      {/* <Footer /> */}

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/search' element={<Search />} />
        <Route path='/user' element={<User />} />
        <Route path='/board'>
        <Route path='write' element={<BoardWrite />} />
        <Route path='detail/:boardNumber' element={<BoardDetail />} />
        <Route path='update/:boardNumber' element={<BoardUpdate />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
