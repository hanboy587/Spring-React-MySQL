import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { userBoardStore } from 'stores';
import useBoardStore from 'stores/board.store';

// component: 게시물 작성 컴포넌트 //
export default function BoardWrite() {

  // state: textarea 요소 참조 상태 //
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  // state file input 요소 참조 상태 //
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // state: board 상태 //
  const { title, setTitle, content, setContent, boardImagesFileList, setBoardImageFileList, resetBoard } = useBoardStore();

  // state: board image 미리보기 url 상태 //
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // effect: 마운트 할 때마다 실행 //
  useEffect(() => {
    resetBoard();
  },[])

  // render: 게시물 작성 컴포넌트 렌더링 //
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <input className='board-write-title-input' type='text' placeholder='제목을 작성해주세요.' value={title} />
          </div>
          <div className='divider'></div>
          <div className='board-write-content-box'>
            <textarea ref={contentRef} className='board-write-content-textarea' placeholder='본문을 작성해주세요.' value={content} />
            <div className='icon-button'>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} />
          </div>
          <div className='board-write-images-box'>
            <div className='board-write-image-box'>
              <img className='board-write-image' src='https://cdn.kgmaeil.net/news/photo/202101/258682_57758_2044.jpg' />
              <div className='icon-button image-close'>
                <div className='icon close-icon'></div>
              </div>

            <div className='board-write-image-box'>
              <img className='board-write-image' src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F991641445B6194EE1C' />
              <div className='icon-button image-close'>
                <div className='icon close-icon'></div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
