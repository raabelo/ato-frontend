const handleIcon = (txt: string): string => {
    switch (txt) {
        case "[1_icon]":
            return "①";
        case "[2_icon]":
            return "②";
        case "[3_icon]":
            return "③";
        case "[4_icon]":
            return "④";
        case "[5_icon]":
            return "⑤";
        case "[6_icon]":
            return "⑥";
        case "[7_icon]":
            return "⑦";
        case "[8_icon]":
            return "⑧";
        case "[9_icon]":
            return "⑨";
        case "[western_icon]":
            return "🔴";
        case "[cyberpunk_icon]":
            return "🟣";
        case "[steampunk_icon]":
            return "🟡";
        case "[pirate_icon]":
            return "🔵";
        case "[noir_icon]":
            return "⚪";
        case "[sword_icon]":
            return "⚔";
        case "[shield_icon]":
            return "⛉";
        case "[wings_icon]":
            return "ཐི°ཋྀ";
        default:
            return "";
    }
};

export default handleIcon;
