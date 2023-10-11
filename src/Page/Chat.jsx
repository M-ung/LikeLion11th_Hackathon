import React, { useState } from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useLocation } from "react-router";
import "./Chat.css"
function Chat() {
    const { state } = useLocation();
    let [text, setText] = useState('');
    let [chat, setChat] = useState([]);

    const handleChatInput = (e) => {
        setText(e.target.value);
    };

    const handleSubmitBtn = () => {
        let copyChat = [...chat];
        if(text != '') {
            copyChat.push(text);
            setChat(copyChat);
            setText('');
        }
    }

    return(
        <section >
            {/* <div className='app-header'>
        <h1 className="header-letter-title">손주자랑</h1>
        <div className='header-icons'>
        <EmailOutlinedIcon fontSize="large"/>
        </div>
            <h1>밤편지</h1>
        </div> */}
            <ul className="list">
                <li className="list-letter">
                    <img src="https://cdn.pixabay.com/photo/2016/09/05/10/50/app-1646213_1280.png" alt="화살표" />
                    <EmailOutlinedIcon/>
                    <div className="list-info">
                        <p className="list-name">익명</p>
                    </div>
                </li>
            </ul>
            <ul className="list-commment">
                <li className="list-comment-letter">
                    <EmailOutlinedIcon/>
                    {state == '사진을 보냈습니다.' ? <img src="https://cdn.pixabay.com/photo/2023/07/22/05/50/wolf-8142720_1280.png"></img>:<p className="">오늘은 날씨가 참 맑고 좋네요 이런날은 왠지 세상이 아름다워 보입니다.<br />
                        이 편지를 어떤 분이 받게 될진 모르겠지만, 편지를 읽으실 모든 분께서는 <br/>
                        아름다운 날씨를 벗 삼아 오늘의 하루를 즐겁게 보내셨으면 좋겠습니다. <br/> <br />
                        어느덧 한 해의 절반이 지나 곧 가을을 앞두고 있습니다. <br />
                        하시던 일 모두 결실을 보는 가을이 되도록 기원하겠습니다. <br />
                        좋은하루 보내시길!
                    </p>}
                    {/* <p className="">오늘은 날씨가 참 맑고 좋네요 이런날은 왠지 세상이 아름다워 보입니다.<br />
                            이 편지를 어떤 분이 받게 될진 모르겠지만, 편지를 읽으실 모든 분께서는 <br/>
                            아름다운 날씨를 벗 삼아 오늘의 하루를 즐겁게 보내셨으면 좋겠습니다. <br/> <br />
                            어느덧 한 해의 절반이 지나 곧 가을을 앞두고 있습니다. <br />
                            하시던 일 모두 결실을 보는 가을이 되도록 기원하겠습니다. <br />
                            좋은하루 보내시길!
            </p> */}
                </li>
            </ul>

            <div >
                {
                    <ShowChatList chatList={chat} />
                }
            </div>

        </section>
    );
}

function ShowChatList({chatList}) {
    return (
        chatList.map((chat, i) => {
            return(
                <div key={i} className="div-chat">
                    <article >
                        <p className="p-chat">{chat}</p>
                    </article>
                </div>
            );
        })
    );
}

export default Chat;