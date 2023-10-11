// import { Route, Routes,Router,BrowserRouter,Link } from 'react-router-dom';
// import LoginPage from './Page/LoginPage';
// import RegisterPage from './Page/RegisterPage';
// import ImageInput from './Page/PostPage';


// const App = () => {
//   return (
//     <div>
//     <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<ImageInput />} />
//         <Route path="/" element={<LoginPage />} /> */}
//         {/* <Route path="/register" element={<RegisterPage/>}/>
//       </Routes>
//     </BrowserRouter>
//   </div>
//   )
// }

// export default App;
import Timeline from './timeline/Timeline';
import ImageInput from "./Page/PostPage";
//댓글..
import { Route, Routes,BrowserRouter } from 'react-router-dom'; // 추가
import Comment from './timeline/posts/Comment';
import LoginPage from "./Page/LoginPage";
import Chat from './Page/Chat';
import Letter from './Page/Letter';
import MyProfile from './MyProfile/MyProfile'
import UserProfile from "./MyProfile/UserProfile";
import PostPage from "./Page/PostPage";
function App() {
  return (
  <>
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/comments/:post_id" element={<Comment/>} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/letter" element={<Letter/>} />
      </Routes>
      </BrowserRouter>
  </>
  );
}

export default App;
