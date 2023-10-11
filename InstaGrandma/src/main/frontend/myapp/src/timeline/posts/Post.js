import React ,{useState} from 'react';
//아이콘
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; //점3개
import { Avatar } from '@mui/material'; //이름 프로필
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined'; // 반응
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'; //댓글
//댓글창 이동
import { useNavigate } from "react-router-dom";

import './Post.css'


function Post ({post_id, userName, userPhone, postTime, imageUrl}) {
    const navigate = useNavigate();
    
    //반응
    const [showReactions, setShowReactions] = useState(false);
    const toggleReactions = () => {
        setShowReactions(!showReactions);
    };

    const handleCloseReactions = () => {
        setShowReactions(false);
    };

    const handleCommentsClick = () => {
      navigate(`/comments/${post_id}`); // 댓글 페이지 경로로 이동
    };
    const getRandomReaction = () => {
        const reactions = ['😍', '😢', '😎'];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        const randomPercentage = Math.floor(Math.random() * 51) + 30;
        return <strong>{`${randomReaction} ${randomPercentage}%`}</strong>;
    };
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');

        return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
    }

    const formattedTime = formatTime(postTime);
    const randomReactionAndPercentage = getRandomReaction();
    return (
        <div className='post'>
            <div className='post_header'>
                <div className='post_headerAuthor'>
                    <a href={`/userprofile?post_id=${post_id}`} style={{ color: '#000', textDecoration: 'none' }}><Avatar sx={{ fontSize: 13 }}>{userName}</Avatar></a>
                    <p><a href={`/userprofile?post_id=${post_id}`} style={{ color: '#000', textDecoration: 'none' }}>{userName}</a> <span>{formattedTime}</span></p>
                </div>
                <MoreHorizIcon />
            </div>
            {userPhone}
            <div className='post_image'>
                <img src={imageUrl} alt=""/>
            </div>
            <div className='post_footer'>
                <div className='post_footerIcons'>
                    <div className='post_iconsMain'>
                        <AddReactionOutlinedIcon className='postIcon' fontSize='medium'onClick={toggleReactions}/>
                        <ChatBubbleOutlineOutlinedIcon 
                        className='postIcon' 
                        fontSize='medium' 
                        onClick={handleCommentsClick}                     
                        />                  
                    </div>
                    {showReactions && (
                        <div className='reactionsModal' onClick={handleCloseReactions}>
                            <div className='reactionOption'>😍</div>
                            <div className='reactionOption'>😢</div>
                            <div className='reactionOption'>😎</div>
                        </div>
                    )}
                </div>
                {randomReactionAndPercentage}
            </div>
        </div>
    );
};


export default Post
