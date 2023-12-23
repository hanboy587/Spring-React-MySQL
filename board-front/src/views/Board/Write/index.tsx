import React from 'react'
import './style.css'

// component: 게시물 작성 컴포넌트 //
export default function BoardWrite() {
  // render: 게시물 작성 컴포넌트 렌더링 //
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <input className='board-write-title-input' />
          </div>
          <div className='divider'></div>
          <div className='board-write=content-box'>
            <textarea className='board-write-content-textarea' />
            <div className='icon-button'>
              <div className='icon image-box-light-icon'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
