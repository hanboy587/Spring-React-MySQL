import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import { useParams } from 'react-router-dom';

// component: 유저 컴포넌트 //
export default function User() {

  // state: //
  const { userEmail } = useParams();

  // component: 유저 상단 화면 //
  const UserTop = () => {

    // state: 이미지 파일 참조 상태 //
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    
    // state: 마이페이지 확인 //
    const [isMypage, setMypage] = useState<boolean>(true);

    // state: 프로필 이미지 상태 //
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // state: 닉네임 상태 //
    const [nickname, setNickname] = useState<string>('');
    // state: 변경 닉네임 상태 //
    const [changeNickname, setChangeNickname] = useState<string>('');
    // state: 닉네임 변경 여부 //
    const [isNicknameChange, setIsNicknameChange] = useState<boolean>(false);

    // event handler: nicknameEditButtonClickHandler //
    const onNicknameEditButtonClickHandler = () => {
      setChangeNickname(nickname);
      setIsNicknameChange(!isNicknameChange);
    }

    //  event handler: profileBoxClickHandler //
    const onProfileBoxClickHandler = () => {
      if (!isMypage) return;
      if (!imageInputRef.current) return;
      imageInputRef.current.click();
    }

    // event handler: onProfileImageChangeHandler //
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files?.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
    }

    // event handler: onNicknameChangeHandler //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setChangeNickname(value);
    }


    // effect: user email patt variable 변경 시 //
    useEffect(() => {

      if (!userEmail) return;
      setNickname('닉네임입니다');
      setProfileImage(defaultProfileImage);
    }, [userEmail])


    // render: 유저 상단 화면 렌더링 //
    return(
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMypage ? 
            <div className='user-top-my-profile-image-box' onClick={onProfileBoxClickHandler}>
              {profileImage !== null ?
                <div className='user-top-profile-iamge' style={{ backgroundImage: `url(${profileImage})` }}></div> :
                <div className='icon-box-large'>
                  <div className='icon image-box-white-icon'></div>
                </div>
              }
              <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onProfileImageChangeHandler} />
            </div> :
            <div className='user-top-profile-image-box' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
          }
          
          <div className='user-top-info-box'>
            <div className='user-top-info-nickname-box'>
              {isMypage ? 
                <>
                  {isNicknameChange ?
                    <input className='user-top-info-nickname-input' type='text' size={changeNickname.length + 2} value={changeNickname} onChange={onNicknameChangeHandler} /> :
                    <div className='user-top-info-nickname'>{nickname}</div>
                  }
                  <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
                    <div className='icon edit-icon'></div>
                  </div>
                </> :
                <div className='user-top-info-nickname'>{nickname}</div>
              }
              
            </div>
            <div className='user-top-info-email'>{'email3@email.com'}</div>
          </div>
        </div>
      </div>
    )
  }

  // component: 유저 하단 화면 //
  const UserBottom = () => {
    
    // render: 유저 하단 화면 렌더링 //
    return(
      <div></div>
    )
  }

  // render: 유저 컴포넌트 렌더링 //
  return (
    <>
      <UserTop />
      <UserBottom />
    </>
  )
}
