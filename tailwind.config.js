/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            default: ["Century Gothic"],
            body: ["Josefin Sans"],
        },
        extend: {
            backgroundImage: {
                "menu-play": "url('./src/assets/background/menu_play.png')",
                "menu-collection": "url('./src/assets/background/menu_collection.png')",
                "loading-screen": "url('./src/assets/background/loading_screen.png')",
                "login-screen": "url('./src/assets/background/login_screen.png')",
                "game-board": "url('./src/assets/background/game_board.png')",

                smoke: "url('./src/assets/GUI/black_smoke.png')",
                "btn-play": "url('./src/assets/GUI/btn_play.png')",
                "btn-default": "url('./src/assets/GUI/btn_default.png')",
            },
            aspectRatio: {
                "5/7": "5/7",
            },
            animation: {
                expand: "expand 0.5s linear",
            },
            keyframes: {
                expand: {
                    "0%": { transform: "scale(1)" },
                    "100%": { transform: "scale(5)" },
                },
                shake: {
                    "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
                    "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
                    "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
                    "30%": { transform: " translate(3px, 2px) rotate(0deg)" },
                    "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
                    "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
                    "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
                    "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
                    "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
                    "90%": { transform: " translate(1px, 2px) rotate(0deg)" },
                    "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
                },
            },
        },
        container: {
            center: true,
        },
        colors: {
            transparent: "transparent",
            white: "#ffffff",
            black: "#000000",
            primary: "#CDB990",
            yellow: {
                DEFAULT: "#F7A906",
                dark: "#704E07",
                darker: "#342504",
            },
            red: {
                DEFAULT: "#D2082F",
                dark: "#71051A",
                darker: "#3E030F",
            },
            blue: {
                DEFAULT: "#008FC6",
                dark: "#006187",
                darker: "#002D3F",
            },
            grey: {
                DEFAULT: "#939598",
                dark: "#303030",
                darker: "#1E1E1E",
            },
            purple: {
                DEFAULT: "#683679",
                dark: "#3B2044",
                darker: "#27152D",
            },
            green: {
                DEFAULT: "#1D5110",
            },
        },
    },
    plugins: [],
};
