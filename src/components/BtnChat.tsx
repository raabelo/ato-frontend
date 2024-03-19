import React from "react";

import BtnImage from "../assets/GUI/btn_chat.png";

const BtnChat: React.FC = () => {
    return (
        <button type="button" className={`fixed bottom-2 left-2 z-50`}>
            <img src={BtnImage} className="w-9 h-10 objetct-contain"></img>
        </button>
    );
};

export default BtnChat;
