import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post'; // Post 컴포넌트를 가져옴
import "./Comment.css"; 
import CommentForm from './CommentForm';
import { Avatar } from '@mui/material'; // Avatar 컴포넌트 추가

function Comment() {
  const { post_id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // 댓글 데이터 추가


  // 포스트 데이터 (협업시 고쳐야함)
  const posts = [
    {
      post_id: 1,
      user: "이영필",
      postImage: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F469%2F2014%2F06%2F27%2F1ea2778d6dc84a3fb799e993fd7e3289_99_20140627204503.jpg&type=sc960_832",
      likes: "12%",
      timestamp: "2시간 전",
    },
    {
      post_id: 2,
      user: "김철수",
      postImage: "https://cdn.pixabay.com/photo/2015/02/27/03/20/warm-feeling-651473_1280.jpg",
      likes: "20%",
      timestamp: "12시간 전",
    },
    {
      post_id: 3,
      user: "최영희",
      postImage: "https://cdn.pixabay.com/photo/2018/08/12/19/51/senior-3601588_1280.jpg",
      likes: "35%",
      timestamp: "하루 전",
    },
  ];

  useEffect(() => {
    // post_id에 해당하는 포스트를 posts에서 찾아서 가져오는 로직
    const selectedPost = posts.find(p => p.post_id === parseInt(post_id));
    if (selectedPost) {
      setPost(selectedPost);
    }
  }, [post_id]);

  if (!post) {
    return <div>Loading...</div>;
  };

  // 댓글 추가 함수
  const handleAddComment = (newComment) => {
 
    setComments([...comments, newComment]);
  };


  return (
    <div className='comment-container'>
      {/* 포스트 정보 표시 */}
      <Post 
        post_id={post.post_id}
        user={post.user}
        postImage={post.postImage}
        likes={post.likes}
        timestamp={post.timestamp}
      />
  
      {/* 댓글 입력 폼 */}
      <div className='commentForm-container'> 
        <CommentForm comments={comments} setComments={setComments} AddComment={handleAddComment} />
      </div>
  
      {/* 댓글 리스트 */}
      <div className='comment-list'>
      
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <Avatar>{comment.user}</Avatar>
              {comment.text}
              </li>
          ))}
            <li>
              <Avatar>이지영</Avatar>
              ❤️
            </li>
            <li>
              <Avatar>이영란</Avatar>
              😚
            </li>
            <li>
              <Avatar>이필영</Avatar>
              😘
            </li>
        </ul>
      </div>
    </div>
  );
}

export default Comment;