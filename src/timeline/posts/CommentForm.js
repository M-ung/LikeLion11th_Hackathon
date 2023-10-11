import React, { useState } from 'react';
import { Avatar } from '@mui/material'; //이름 프로필
import EmoticonModal from './EmotionModal';
import './CommentForm.css';

function CommentForm({ user, comments, setComments }) {
    const [comment, setComment] = useState('');
    const [isEmoticonModalOpen, setIsEmoticonModalOpen] = useState(false); // 모달 상태 추가
    const [isTextModalOpen, setIsTextModalOpen] = useState(false); // 텍스트 모달 상태 추가

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 이모티콘 체크 (이모티콘만 입력하도록 필터링)
        if (comment.match(/[\p{Emoji_Presentation}\s]/u)) {

            setComments([...comments, Comment]);
            setComment('');
        } else {
            setIsTextModalOpen(true);
        }
    };

    const closeEmoticonModal = () => {
        setIsEmoticonModalOpen(false);
    };

    const closeTextModal = () => {
        setIsTextModalOpen(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='user-info' style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar>loginuser</Avatar>
                <p>loginuser</p>
            </div>
            <input className='inputBox'
                   type="text"
                   placeholder="이모티콘을 입력하세요..."
                   value={comment}
                   onChange={handleCommentChange}
            />
            <button className='submit-button' type="submit">작성</button>
            <EmoticonModal isOpen={isEmoticonModalOpen} onRequestClose={closeEmoticonModal} />
            <EmoticonModal isOpen={isTextModalOpen} onRequestClose={closeTextModal}>
                <h2>텍스트 입력 불가</h2>
                <p>이모티콘만 입력 가능합니다.</p>
            </EmoticonModal>
        </form>
    );
}

export default CommentForm;