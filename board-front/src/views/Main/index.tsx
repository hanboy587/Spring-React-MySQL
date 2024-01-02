import React, { useEffect, useState } from 'react'
import './style.css'
import Top3Item from 'components/Top3Item'
import { BoardListItem } from 'types/interface'
import { latestBoardListMock, top3BoardListMock } from 'mocks'
import BoardItem from 'components/BoardItem'
import { useFetcher } from 'react-router-dom'

// component: 메인 컴포넌트 //
export default function Main() {

  // component: main 상단 컴포넌트 //
  const MainTop = () => {

    // state: 주간 top 3 게시물 리스트 //
    const [top3List, setTop3List] = useState<BoardListItem[]>([]);

    // effect: 첫 마운트 시 실행 //
    useEffect(() => {
      setTop3List(top3BoardListMock);
    }, [])
    
    // render: main 상단 렌더링 //
    return (
      <div id='main-top-warapper'>
        <div className='main-top=container'>
          <div className='main-top-title'>{'환영합니다.\n함께 이야기를 나눠봅시다.'}</div>
          <div className='main-top-contents-box'>
            <div className='main-top-contents-title'>{'주간 TOP 3 게시글'}</div>
            <div className='main-top-contents'>
              {top3List.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}
              
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // component: main 하단 컴포넌트 //
  const MainBottom = () => {

    // state: 최신 게시물 //
    const [currentBoardList, setCurrentBoardList] = useState<BoardListItem[]>();

    // state: 인기 검색어 //
    const [popularWordList, setPopularWordList] = useState<String[]>([]);

    useEffect(() => {
      setCurrentBoardList(latestBoardListMock);
      setPopularWordList(['안녕', '반가워', '고마워']);
    })
    
    // render: main 하단 렌더링 //
    return (
      <div id='main-bottom-wrapper'>
        <div className='main-bottom-container'>
          <div className='main-bottom-title'>{'최신 게시물'}</div>
          <div className='main-bottom-contents-box'>
            <div className='main-bottom-current-contents'>
              {currentBoardList?.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
            </div>
            <div className='main-bottom-popular-box'>
              <div className='main-bottom-popular-card'>
                <div className='main-bottom-popular-card-box'>
                  <div className='main-bottom-popular-card-title'>{'인기 검색어'}</div>
                  <div className='main-bottom-popular-card-contents'>
                    {popularWordList.map(word => <div className='word-badge'>{word}</div>)}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='main-bottom-pagination-box'>
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    )
  }



  // component: main 하단 컴포넌트 //
  // render: 메인 컴포넌트 렌더링 //
  return (
    <div>
      <MainTop />
      <MainBottom />
    </div>
  )
}
