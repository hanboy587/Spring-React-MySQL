import React, { useState, KeyboardEvent, useRef, ChangeEvent } from 'react'
import './style.css'
import InputBox from 'components/inputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { signInRequest } from 'apis';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

// component: 인증 컴포넌트 //
export default function Authentication() {
  // state: sign 상태 //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

  // state: cookie 상태 //
  const [cookies, setCookies] = useCookies();

  // function: navigate //
  const navigator = useNavigate();
  
  // component: sign in card 컴포넌트 //
  const SignInCard = () => {

    // state: email 요소 참조 상태 //
    const emailRef = useRef<HTMLInputElement | null>(null);

    // state: password 요소 참조 상태 //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    // state: email 상태 //
    const [email, setEmail] = useState<string>('');

    // state: password 상태 //
    const [password, setPassword] = useState<string>('');

    // state: password type 상태 //
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

    // state: password button icon 상태 //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon')
    
    // state: error 상태 //
    const [error, setError] = useState<boolean>(false);

    // event handler: password button 클릭 이벤트 처리 //
    const onPasswordButtonClickHandler = () => {
      if (passwordType === 'text') {
        setPasswordType('password');
        setPasswordButtonIcon('eye-light-off-icon');
      } else {
        setPasswordType('text');
        setPasswordButtonIcon('eye-light-on-icon');
        
      }
    }
    
    // event handler: email input keyDown 이벤트 처리 //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    }

    // function: sign in response 처리 //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
      if (!responseBody) {
        // back이 안 켜져 있거나 도메인이 틀렸을 때
        alert('네트워크 상태를 확인 해주세요.')
        return;
      }
      const { code } = responseBody;
      if (code === "DBE") alert('데이터 베이스 오류입니다.');
      if (code === "SF" || code === "VF") setError(true);
      if (code !== "SU") return;

      // 성공 일 시 2개 인자 호출
      const { token, expirationTime } = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      // 현재 시간 + 3600s
      const expires = new Date(now + expirationTime * 1000);

      // expires 시간 후 메인 화면으로
      setCookies('accessToken', token, { expires, path: MAIN_PATH() });
      navigator(MAIN_PATH());
    }

    // event handler: email onChange 이벤트 처리 //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setEmail(value);
    }

    // event handler: password onChange 이벤트 처리 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setPassword(value);
    }
    
    // event handler: login button 클릭 이벤트 처리 //
    const onSignInButtonClickHandler = () => {
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody)
        .then(signInResponse);
    }
    
    // event handler: 회원 가입 링크 클릭 이벤트 처리 //
    const onSignUpLinkClickHandler = () => {
      setView('sign-up');
    }
    // event handler: password keyDown 이벤트 처리 //
    const passwordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignInButtonClickHandler();
    }

    // render: sign in card 컴포넌트  렌더링//
    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'로그인'}</div>
            </div>
            <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
            <InputBox ref={passwordRef} label='비밀번호' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={passwordKeyDownHandler} />
          </div>
          <div className='auth-card-bottom'>
            {error && 
            <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>
                {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'}
              </div>
            </div>
            
            }
            <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
            <div className='auth-description-box'>{'신규 사용자이신가요?'}&nbsp;<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{' 회원가입'}</span></div>
          </div>
        </div>
      </div>
    );
  };
  
  // component: sign up card 컴포넌트 //
  const SignUpCard = () => {
    
    // render: sign up card 컴포넌트  렌더링//
    return (
      <div id='auth-card'></div>
    );
  };

  // render: 인증 컴포넌트 렌더링 //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-content'>
            {/* <div className='auth-logo-icon'></div> */}
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
              <div className='auth-jumbotron-text'>{'Juns Board 입니다.'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-up' && <SignUpCard />}
      </div>
      
    </div>
  )
}
