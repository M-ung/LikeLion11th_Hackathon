// ToastNotification.js
import React, { useState, useEffect } from "react";

// css
import "./Toast.css";

function ToastNotification(props) {
    const count = localStorage.getItem('count');
    useEffect(() => {
        let timer = setTimeout(() => {
            props.setToastState(false);		// 2초 뒤, toastState가 false가 되면서 알림창이 사라진다
        }, 2000);

        return () => { clearTimeout(timer) }
    }, []);

    return (
        <div className="toast-alert">
            <p>{count}번 조회했습니다</p>
        </div>
    );
}

export { ToastNotification }