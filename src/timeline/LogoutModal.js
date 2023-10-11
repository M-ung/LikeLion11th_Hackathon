import React from "react";
import Modal from "react-modal";
import "./LogoutModal.css";
import axios from "axios";

Modal.setAppElement("#root");

function LogoutModal({ isOpen, onRequestClose}) {

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            alert('로그아웃이 완료되었습니다!!');
            window.location.href = "./?"
        } catch (error) {
            console.error('Error registering user:', error);
            alert('로그아웃이 실패되었습니다!!');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="overlay"
        >
            <h2>로그아웃하시겠습니까?</h2>
            <div className="modal-buttons">
                <button className='yes-buttons' onClick={handleLogout}>예</button>
                <button className='no-buttons' onClick={onRequestClose}>아니오</button>
            </div>
        </Modal>
    );
}

export default LogoutModal;
