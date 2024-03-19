import React from "react";

import BtnImage from "../assets/GUI/btn_settings.png";

const BtnSettings: React.FC = () => {
    return (
        <button type="button" className={`fixed bottom-2 right-2 z-40`}>
            <img src={BtnImage} className="w-9 h-10 objetct-contain"></img>
        </button>
    );
};

export default BtnSettings;
