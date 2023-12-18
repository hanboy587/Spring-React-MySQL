import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_PATH, SEARCH_PATH } from 'constant';

// component: Header 레이아웃 //
export default function Header() {

// function: nevigate 함수 //
const navigator = useNavigate();

// event handler: 로고 클릭 이벤트 처리 //
const onLogoClickHandler = () => {
  navigator(MAIN_PATH());
}

// component: 검색 버튼 컴포넌트 //
const SearchButton = () => {

  // state: 검색 버튼 참조 상태 //
  const searchButtonRef = useRef<HTMLInputElement | null>(null);


  // state: 검색 버튼 상태 //
  const [status, setStatus] = useState<boolean>(false);
  
  // state: 검색어 상태 //
  const [word, sethWord] = useState<string>('');
  
  // state: 검색 path 상태 //
  const { searchWord } = useParams();



  // event handler: 검색어 변경 이벤트 처리 //
  const onSearchButtonClickHandler = () => {
    if(!status) {
      setStatus(!status);
      return;
    }
    navigator(SEARCH_PATH(word));
  }

  // event handler: 검색어 키 이벤트 처리 //
  const onSearchWordKeyDownhandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!searchButtonRef.current) return;
    searchButtonRef.current.click();
  }


  // event handler: search icon 클릭 이벤트 처리 //
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    sethWord(value);
  }

  // effect: 검색어 path  //
  useEffect(() => {
    if(searchWord) {
      sethWord(searchWord);
      setStatus(true);
    } 
  }, [searchWord]);



  // render: 검색 버튼 렌더링(false) //
  if (!status) return (
    <div className='icon-button' onClick={onSearchButtonClickHandler}>
    <div className='icon search-light-icon'></div></div>
  )
  
  // render: 검색 버튼 렌더링(true) //
  return (
    <div className='header-search-input-box'>
      <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownhandler} />
      <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
        <div className='icon search-light-icon'></div>
      </div>
    </div>  
  )
  

}

// render: Header 레이아웃 렌더링 //
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'Juns Board'}</div>
        </div>
        <div className='header-right-box'>
          <SearchButton />
        </div>
      </div>
    </div>
  )
}
