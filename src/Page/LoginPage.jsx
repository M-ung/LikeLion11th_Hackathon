import React, { useState,useEffect } from 'react';
import Modal from './ModalPage';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function LoginPage() {

    const [Telephone, setTelephone] = useState("");
    const [isOpen, setIsOpen] = useState(false); 
    localStorage.removeItem("count");
    const navigate = useNavigate(); // navigate 함수를 초기화합니다
    const onTelephoneHandler = (event) => {
        setTelephone(event.currentTarget.value);
    }

    const handlelogin = async(event) => {
        event.preventDefault();
        try {
            await axios.post('/api/login', {
                userPhone: Telephone,
            });
            alert('로그인 성공!!!');
            navigate('/timeline');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('로그인 실패!!! 휴대폰 인증을 해주세요!!!!!'); // 실패 메세지 설정
        }
    }
    const openModalHandler = (event) => {
        // isOpen의 상태를 변경하는 메소드를 구현
        // !false -> !true -> !false
        event.preventDefault();
        setIsOpen(!isOpen) 
    };
    
    
    return (
        <div className='div-outer'>
            <form className='div-inner'>
                <section className='sec-container'>
                    <h1 className='header-title'>인스타그랜마</h1>
                    <input className='input-tel' type='tel' value={Telephone} onChange={onTelephoneHandler} placeholder='전화번호'/>
                    <br/>
                    <button className='button-login' formAction='' onClick={handlelogin}>로그인</button>
                    
                </section>
            </form>
            <form className='div-inner2'>
                <section className='sec-container'>
                <button className='button-register' formAction='' onClick={openModalHandler}>휴대폰 인증</button>
                {isOpen ? <Modal openModalHandler={openModalHandler} /> : null}
                </section>
            </form>
        </div>
       
        
    )
 }
 
export default LoginPage;

