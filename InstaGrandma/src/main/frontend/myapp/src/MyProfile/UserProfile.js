import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material"; //이름 프로필
import "./MyProfile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserProfile() {
    const [user, setUser] = useState({});
    const [myPosts, setMyPosts] = useState([]);
    const [editedName, setEditedName] = useState("");
    const [post_id, setPostId] = useState(null); // 받아온 post_id 값을 저장

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());

        if (params.post_id) {
            setPostId(params.post_id);
            axios.get(`/api/userprofile/${params.post_id}`)
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
                    alert("에러요")
                    console.error("Error fetching posts:", error);
                });

        }
    }, []);

    return (
        <div>
            <div className="app-header">
                <h1 className="header-letter-title">
                    <a href="/timeline" style={{ color: "#000", textDecoration: "none" }}>
                        인스타그랜마
                    </a>
                </h1>
                <div className="header-icons"></div>
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

                <div className="user-feed">
                    <h4></h4>
                    <div className="grid-container">
                        {myPosts.map((post) => (
                            <div key={post.id} className="grid-item">
                                <img src={post.imageUrl} alt={`게시글 ${post.id}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
