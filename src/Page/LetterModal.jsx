import React, { useState,useEffect } from "react";
import "./LetterModal.css"
import { useNavigate } from "react-router-dom";


function LetterModal(props) {
    const navigate = useNavigate();
    const onLetterhadnler = (event) => {
        navigate('/chat',{state: props.inner});
    }






    return (
        <div className="div-letter-modal-container" onClick={props.openModalHandler}>
            <div className="div-letter-modal-inner-container" onClick={(e) => e.stopPropagation()}>
                <button className="button-letter-modal" onClick={props.openModalHandler}>x</button>
                <br/>
                <p className="p-letter-content">우표 1개를 사용하여 답장을 보내시겠습니까?</p>
                <br/>
                <div className="div-letter-modal-tel">
                    <button className="button-letter-modal-tel">네</button>
                    <button className="button-letter-modal-tel" onClick={onLetterhadnler}>아니요</button>
                </div>

                <br/>
                <p className="p-letter-sec-content">우표 얻으러 가기</p>
                <a href="https://www.youtube.com/" className="div-letter-modal-certification">광고보기</a>

            </div>
        </div>
    )
}
export default LetterModal;