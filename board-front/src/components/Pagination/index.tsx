import React from 'react'
import './style.css';

// component: pagination 컴포넌트 //
export default function pagination() {

  // event handler: pageNumber click event //
  const onPageNumberClickHandler = () => {
    
  }

// render: pagination 컴포넌트 렌더링 //
  return (
    <div id='pagination-wrapper'>
      <div className='pagination-change-link-box'>
        <div className='icon-box-small'>
          <div className='icon expand-left-icon'></div>
        </div>
        <div className='pagination-change-link-text'>{'이전'}</div>
      </div>
      <div className='pagination-divider'>{'\|'}</div>

      <div className='pagination-text-active'>{1}</div>
      <div className='pagination-text'>{2}</div>

      <div className='pagination-divider'>{'\|'}</div>
      <div className='pagination-change-link-box'>
      <div className='pagination-change-link-text'>{'다음'}</div>
        <div className='icon-box-small'>
          <div className='icon expand-right-icon'></div>
        </div>
      </div>
    </div>
  )
}
