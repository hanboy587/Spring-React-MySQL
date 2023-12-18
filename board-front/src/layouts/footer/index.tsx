import React from 'react'
import './style.css';

// component: footer 레이아웃 //
export default function Footer() {

// render: footer 레이아웃 렌더링 //
  return (
    <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'></div>
                <div className='footer-link-box'></div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'></div>
            </div>
        </div>
    </div>
  )
}
