import { ChangeEvent, Dispatch, KeyboardEvent, forwardRef } from 'react'
import './style.css'


// interface: inputBox 컴포넌트 properties //
interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    setValue: Dispatch<React.SetStateAction<string>>;
    error: boolean;

    icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
    onButtonClick?: () => void;
    message?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

// component: inputBox 컴포넌트 //
const inputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

// state: properties //
const { label, type, placeholder, value, error, icon, message } = props;
const { setValue, onButtonClick, onKeyDown } = props;

// event handler: input 값 변경 처리 //
const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
}

// event handler: key 이벤트 처리 //
const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(!onKeyDown) return;
    onKeyDown(event);
}


// render: inputBox 렌더링 //
    return (
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
                {onButtonClick !== undefined && (
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && (<div className={`icon ${icon}`} />)}
                    </div>
                )}
            </div>
            {message !== undefined && (<div className='inputbox-message'>{message}</div>)}
            
        </div>
    )
})

export default inputBox;