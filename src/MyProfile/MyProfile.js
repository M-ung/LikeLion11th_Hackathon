import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material"; //이름 프로필
import "./MyProfile.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function MyProfile() {
    const [user, setUser] = useState({});
    const [myPosts, setMyPosts] = useState([]);
    const [editedName, setEditedName] = useState("");
    const navigate = useNavigate(); // navigate 함수를 초기화합니다

    useEffect(() => {
        axios
            .get("/api/myprofile")
            .then((response) => {
                const sortedPosts = response.data.myPosts.sort(
                    (a, b) => b.post_id - a.post_id
                );
                setMyPosts(sortedPosts);
                setUser({
                    name: response.data.userName,
                    postCount: response.data.postCount,
                });
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    const [selectedPosts, setSelectedPosts] = useState([]);
    const togglePostSelection = (post_Id) => {
        if (selectedPosts.includes(post_Id)) {
            setSelectedPosts(selectedPosts.filter((id) => id !== post_Id));
        } else {
            setSelectedPosts([...selectedPosts, post_Id]);
        }
    };
    const handleDeleteSelectedPosts = async () => {
        const selectedPostsString = selectedPosts.join(', ');
        try {
            await axios.post('/api/deletePosts', {
                selectedPosts: selectedPosts, // 선택한 게시물 ID 목록을 전송
            });
            window.location.href = "/myprofile"
        } catch (error) {
            console.error('Error registering user:', error);
            alert('게시물 삭제가 실패되었습니다!!');
        }
    };

    return (
        <div>
            <div className="app-header">
                <h1 className="header-letter-title">
                    <a href="/timeline" style={{ color: "#000", textDecoration: "none" }}>
                        인스타그랜마
                    </a>
                </h1>
                <div className="header-icons"></div>
                <h1>내 정보</h1>
            </div>

            <div className="profile-container">
                <div className="user-profile">
                    <h2>
                        <Avatar sx={{ width: 100, height: 100 }}>{user.name}</Avatar>
                    </h2>
                    <span>{editedName || user.name}</span>
                </div>

                <div className="user-information">
                    <h3>{user.postCount}</h3> <span>게시글 수</span>
                </div>

                <div className="profile-edit">
                    <div className= "delete-button custom-button">
                        <button onClick={handleDeleteSelectedPosts}>선택한 글 삭제</button>
                    </div>
                </div>

                <div className="user-feed">
                    <h4></h4>
                    <div className="grid-container">
                        {myPosts.map((post) => (
                            <div
                                key={post.id}
                                className={`grid-item ${selectedPosts.includes(post.post_id) ? "selected" : ""}`}
                                onClick={() => togglePostSelection(post.post_id)}
                            >
                                <img src={post.imageUrl} alt={`게시글 ${post.post_id}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
