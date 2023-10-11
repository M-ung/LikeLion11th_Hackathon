import React from 'react';
import Modal from 'react-modal';

const EmoticonModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen} //모달 열림닫힘. 열림=true
      onRequestClose={onRequestClose} //열린상태에서 외부클릭/esc시 모달닫게 구현 함수
      contentLabel="이모티콘만 사용해주세요" //모달내용설명
    >
      {children}
    </Modal>
  );
};

export default EmoticonModal;