import React, {useEffect, useState} from 'react'
import Post from './posts/Post'

import "./Timeline.css"
import '../App.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from "axios";
import NicknameModal from "../timeline/NicknameModal";
import ProfileModal from "../timeline/NicknameModal";
import LogoutModal from "../timeline/LogoutModal";
import ConfirmModal from "../timeline/ConfirmModal";

//우리가 만든 고유한 포스트
function Timeline()  {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [count, setCount] = useState(parseInt(localStorage.getItem('count')) || 0); // 초기값을 localStorage에서 가져오기
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
      // count 값이 변경될 때마다 localStorage에 저장
      localStorage.setItem('count', count+1);
    }, [count]);

    useEffect(() => {
        axios.get("/api/timeline")
            .then(response => {
                const sortedPosts = response.data.sort((a, b) => b.post_id - a.post_id);
                setPosts(sortedPosts);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);
    const handleEditClick = () => {
        setIsModalOpen(true);
    };
    const handleProfileClick = () => {
        setIsProfileModalOpen(true);
    };
    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };
    //탈퇴
    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

  return (
    <div className="app">
    <div className='app-header'>
        <h1><a href="/timeline" style={{ color: '#000', textDecoration: 'none' }}>인스타그랜마</a></h1>
        <div className='header-icons'>
        <a href="/myprofile" style={{ color: '#000', textDecoration: 'none' }}><AccountCircleOutlinedIcon fontSize="large"/></a>
        <a className='header-button' href="/post" style={{ color: '#000', textDecoration: 'none' }}><AddPhotoAlternateOutlinedIcon fontSize='large' /></a>
        <LightbulbOutlinedIcon fontSize="large"/>
        <a href="/letter" style={{ color: '#000', textDecoration: 'none' }}><EmailOutlinedIcon fontSize="large"/> </a>
            <div className="dropdown-container">
                <SettingsIcon
                    className="settings-button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    fontSize="large"
                >
                </SettingsIcon>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <a onClick={handleEditClick}>닉네임 변경</a>
                        <a onClick={handleProfileClick}>프로필 사진 변경</a>
                        <a onClick={handleLogoutClick}>로그아웃</a>
                        <a onClick={handleDeleteClick}>회원탈퇴</a>
                    </div>
                )}
            </div>
        </div>
    </div>
    <div className="timeline">
      <div className="timeline_left">
        <div className="timeline_post">
          {posts.map(post =>(
            <Post
            post_id={post.post_id} // 프론트엔드와 백엔드 간의 고유한 식별자(ID)
            userName={post.userName}
            postName={post.postName}
            // likes={post.likes}
            postTime={post.postTime}
            imageUrl={post.imageUrl}  //post id 추가전달
            posts={posts} />
          ))}
        </div>
      </div>
      <div className='timeline_right'>
      </div>
    </div>
        <NicknameModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
        />
        <ProfileModal
            isOpen={isProfileModalOpen}
            onRequestClose={() => setIsProfileModalOpen(false)}
        />
        <LogoutModal
            isOpen={isLogoutModalOpen}
            onRequestClose={() => setIsLogoutModalOpen(false)}
        />
        <ConfirmModal
            isOpen={isDeleteModalOpen}
            onRequestClose={() => setIsDeleteModalOpen(false)}
        />
    </div>
  )
}

export default Timeline
