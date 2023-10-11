import React from "react";
import Modal from "react-modal";
import "./ConfirmModal.css";
import axios from "axios";

Modal.setAppElement("#root");

function ConfirmModal({ isOpen, onRequestClose}) {

  const handleConfirm = async () => {
    try {
      await axios.post('/api/delete');
      alert('회원탈퇴가 완료되었습니다!!');
      window.location.href = "./?"
    } catch (error) {
      console.error('Error registering user:', error);
      alert('회원탈퇴가 실패되었습니다!!');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>정말로 탈퇴하시겠습니까?</h2>
      <h4>게시글과 회원정보가 모두 삭제됩니다.</h4>
      <div className="modal-buttons">
        <button className='yes-buttons' onClick={handleConfirm}>예</button>
        <button className='no-buttons' onClick={onRequestClose}>아니오</button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
