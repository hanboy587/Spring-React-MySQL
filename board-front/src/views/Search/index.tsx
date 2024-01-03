import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { BoardListItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { SEARCH_PATH } from 'constant';
import Pagination from 'components/Pagination';

// component: 검색 컴포넌트 //
export default function Search() {

  // state: searchWord 상태 //
  const { searchWord } = useParams();
  // state: 검색 게시물 리스트 상태 (임시) //
  const [searchBoardList, setSearchBoardList] = useState<BoardListItem[]>([]);
  // state: 검색 게시물 리스트 갯수 상태 //
  const [count, setCount] = useState<number>(2);
  // state: 관련 검색어 리스트 상태 //
  const [relationList, setRelationList] = useState<string[]>([]);

  // function: navigator //
  const navigator = useNavigate();

  // event handler: onRelationWordClickHandler //
  const onRelationWordClickHandler = (word: string) => {
    navigator(SEARCH_PATH(word));
  }

  // effect: 첫 마운트 시 //
  useEffect(() => {
    setSearchBoardList(latestBoardListMock);
  }, [])


  // render: 검색 컴포넌트 렌더링 //
  if (!searchWord) return (<></>) 
  return (
    <div id='search-wrapper'>
      <div className='search-container'>
        <div className='search-title-box'>
          <div className='search-title'><span className='emphasis'>{searchWord}</span>{'에 대한 검색결과 입니다.'}</div>
          <div className='search-count'>{count}</div>
        </div>
        <div className='search-contents-box'>
          {count === 0 ?
          <div className='search-contents-nothing'>{'검색 결과가 없습니다.'}</div> :
          <div className='search-contents'>
            {searchBoardList.map(item => <BoardItem boardListItem={item} />)}
          </div>
          }
          <div className='search-relation-box'>
            <div className='search-relation-card'>
              <div className='search-relation-card-container'>
                <div className='search-relation-card-title'></div>
                {relationList.length === 0 ?
                  <div className='search-relation-card-contents-nothing'></div> :
                  <div className='search-realtion-card-contents'>
                    {relationList.map(word => <div className='word-badge' onClick={() => onRelationWordClickHandler(word)}>{word}</div>)}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='search-pagination-box'>
          {/* <Pagination /> */}
        </div>
      </div>
    </div>
  )
}
