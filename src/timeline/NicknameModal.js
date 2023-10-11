import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './NicknameModal.css';

Modal.setAppElement('#root');

function NicknameModal({ isOpen, onRequestClose }) {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleUserPhoneChange = (e) => {
    setUserPhone(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      await axios.post('/api/update', {
        userName: userName,
        userPhone: userPhone,
      });
      alert('회원정보가 수정되었습니다!!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('회원정보 수정을 실패했습니다!!');
    }
    window.location.href = './timeline';
    onRequestClose();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/update');
        const userData = response.data;
        setUserName(userData.userName);
        setUserPhone(userData.userPhone);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  return (
      <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          className="modal"
          overlayClassName="overlay"
      >
        <h2>닉네임 변경</h2>
        <div className="input-container">
          <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              placeholder={userName}
          />
        </div>
        <div className="input-container">
          <input
              type="text"
              value={userPhone}
              onChange={handleUserPhoneChange}
              placeholder={userPhone}
              disabled
          />
        </div>
        <div className="modal-buttons">
          <button className="yes-buttons" onClick={handleSubmit}>
            예
          </button>
          <button className="no-buttons" onClick={onRequestClose}>
            아니오
          </button>
        </div>
      </Modal>
  );
}

export default NicknameModal;
