import React, { Dispatch, SetStateAction, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Planet from "../assets/random/planet.webp";
import Requests from "../services/api";
import { useNavigate } from "react-router-dom";
import AnomalyLogo from "../assets/logo/Anomaly.png";

const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
};
const SigninSchema = Yup.object().shape({
    nickname: Yup.string().max(20).required("Required"),
    password: Yup.string().max(100).required("Required"),
});
const SignupSchema = Yup.object().shape({
    nickname: Yup.string().min(3).max(20).required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .max(100)
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    repeatpass: Yup.string()
        .required("Please re-type your password")
        .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const Signin: React.FC<{ setView: Dispatch<SetStateAction<"IN" | "UP">> }> = ({ setView }) => {
    const [currentField, setCurrentField] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignin = (values: { nickname: string; password: string }) => {
        setLoading(true);
        const obj = {
            nickname: values.nickname,
            password: values.password,
        };

        Requests.post("/auth/login", obj)
            .then((authRes) => {
                if (authRes.data.uid) {
                    localStorage.setItem("access_token", authRes.data.access_token);
                    localStorage.setItem("refresh_token", authRes.data.refresh_token);
                    Requests.get(`/users/${authRes.data.uid}`).then((userRes) => {
                        localStorage.setItem("uid", userRes.data.id);
                        setTimeout(() => {
                            setLoading(false);
                            navigate("/");
                        }, 1000);
                    });
                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 404:
                        console.log("Jogador não encontrado!");
                        break;

                    default:
                        console.log("Tente novamente mais tarde!");
                        break;
                }
                setLoading(false);
            });
    };

    return (
        <div className="rounded-2xl overflow-hidden border border-primary bg-black/80 backdrop-blur flex justify-center items-center p-10">
            <Formik
                className="h-fit"
                initialValues={{ nickname: "", password: "" }}
                validationSchema={SigninSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        handleSignin(values);
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ values, errors, touched }) => (
                    <Form
                        className=" rounded-full flex flex-col gap-4 w-80"
                        style={{ display: loading ? "none" : "flex" }}
                        autoComplete={"off"}
                    >
                        <p className="font-bold text-xl text-white text-center text-bold mb-2">
                            Login
                        </p>
                        <div>
                            <p
                                className=" text-grey text-sm text-[0.85rem] pl-2 pb-1 transition-all"
                                style={{
                                    margin:
                                        values.nickname || currentField === "nickname"
                                            ? "0px 0px 0px 0px"
                                            : "10px 0px -30px 0px",
                                }}
                            >
                                Nome de jogador
                            </p>
                            <Field
                                onFocus={() => setCurrentField("nickname")}
                                onBlur={() => setCurrentField("")}
                                name="nickname"
                                className={`  px-4 text-sm focus:border-white py-2 bg-transparent text-white w-full border-b border-primary ${
                                    errors.nickname && touched.nickname ? " border-red" : ""
                                }`}
                            />
                            <ErrorMessage
                                name="nickname"
                                component="div"
                                className="text-red absolute"
                            />
                        </div>

                        <div>
                            <p
                                className=" text-grey text-sm text-[0.85rem] pl-2 pb-1 transition-all"
                                style={{
                                    margin:
                                        values.password || currentField === "password"
                                            ? "0px 0px 0px 0px"
                                            : "10px 0px -30px 0px",
                                }}
                            >
                                Senha
                            </p>
                            <Field
                                onFocus={() => setCurrentField("password")}
                                onBlur={() => setCurrentField("")}
                                name="password"
                                className={`  px-4 text-sm focus:border-white py-2 bg-transparent text-white w-full border-b border-primary ${
                                    errors.password && touched.password ? " border-red" : ""
                                }`}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red absolute"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-8 text-sm  text-black rounded-full bg-primary py-2 border border-primary
                                        hover:opacity-75 transition-all active:scale-95"
                        >
                            Conecte-se
                        </button>
                        <p className="text-center text-white text-xs my-[-0.5rem]">ou</p>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setView("UP");
                            }}
                            className=" text-sm text-white rounded-full bg-black py-2 border border-primary
                                        hover:opacity-60 transition-all active:scale-95"
                        >
                            Crie sua conta
                        </button>
                        <p className="text-center text-white mb-4 text-sm hover:underline transition-all w-fit cursor-pointer m-auto ">
                            Esqueci minha senha
                        </p>
                    </Form>
                )}
            </Formik>
            {loading && (
                <img
                    src={AnomalyLogo}
                    className="absolute size-10 animate-spin"
                    draggable={false}
                />
            )}
        </div>
    );
};

const Signup: React.FC<{ setView: Dispatch<SetStateAction<"IN" | "UP">> }> = ({ setView }) => {
    const [currentField, setCurrentField] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (values: {
        nickname: string;
        email: string;
        password: string;
        repeatpass: string;
    }) => {
        setLoading(true);
        const user = {
            nickname: values.nickname,
            email: values.email,
            password: values.password,
        };
        Requests.post("/users", user)
            .then((userRes) => {
                localStorage.setItem("uid", userRes.data.id);
                Requests.post(`/auth/login`, {
                    nickname: user.nickname,
                    password: user.password,
                }).then((authRes) => {
                    localStorage.setItem("access_token", authRes.data.access_token);
                    localStorage.setItem("refresh_token", authRes.data.refresh_token);
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/");
                    }, 1000);
                });
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 404:
                        console.log("Jogador não encontrado!");
                        break;

                    default:
                        console.log("Tente novamente mais tarde!");
                        break;
                }
                setLoading(false);
            });
    };

    return (
        <div className="rounded-2xl overflow-hidden border border-primary bg-black/80 backdrop-blur flex justify-center items-center p-10">
            <Formik
                className="h-fit"
                initialValues={{ nickname: "", email: "", password: "", repeatpass: "" }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleSignup(values);
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ values, errors, touched }) => (
                    <Form
                        className=" rounded-full flex flex-col gap-4 w-80"
                        style={{ display: loading ? "none" : "flex" }}
                        autoComplete={"off"}
                        // onSubmit={handleSignup}
                    >
                        <p className="font-bold text-xl text-white text-center text-bold mb-2">
                            Cadastre-se
                        </p>
                        <div>
                            <p
                                className=" text-grey text-sm text-[0.85rem] pl-2 pb-1 transition-all"
                                style={{
                                    margin:
                                        values.nickname || currentField === "nickname"
                                            ? "0px 0px 0px 0px"
                                            : "10px 0px -30px 0px",
                                }}
                            >
                                Nome de jogador
                            </p>
                            <Field
                                onFocus={() => setCurrentField("nickname")}
                                onBlur={() => setCurrentField("")}
                                name="nickname"
                                className={`  px-4 text-sm focus:border-white py-2 bg-transparent text-white w-full border-b border-primary ${
                                    errors.nickname && touched.nickname ? " border-red" : ""
                                }`}
                            />
                            <ErrorMessage
                                name="nickname"
                                component="div"
                                className="text-red absolute text-xs mb-20"
                            />
                        </div>

                        <div>
                            <p
                                className=" text-grey text-sm text-[0.85rem] pl-2 pb-1 transition-all"
                                style={{
                                    margin:
                                        values.email || currentField === "email"
                                            ? "0px 0px 0px 0px"
                                            : "10px 0px -30px 0px",
                                }}
                            >
                                Endereço de e-mail
                            </p>
                            <Field
                                type="email"
                                onFocus={() => setCurrentField("email")}
                                onBlur={() => setCurrentField("")}
                                name="email"
                                className={`  px-4 text-sm focus:border-white py-2 bg-transparent text-white w-full border-b border-primary ${
                                    errors.email && touched.email ? " border-red" : ""
                                }`}
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red absolute"
                            />
                        </div>

                        <div>
                            <p
                                className=" text-grey text-sm text-[0.85rem] pl-2 pb-1 transition-all"
                                style={{
                                    margin:
                                        values.password || currentField === "password"
                                            ? "0px 0px 0px 0px"
                                            : "10px 0px -30px 0px",
                                }}
                            >
                                Senha
                            </p>
                            <Field
                                onFocus={() => setCurrentField("password")}
                                onBlur={() => setCurrentField("")}
                                name="password"
                                className={`  px-4 text-sm focus:border-white py-2 bg-transparent text-white w-full border-b border-primary ${
                                    errors.password && touched.password ? " border-red" : ""
                                }`}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red absolute"
                            />
                        </div>
                        <div>
                            <p
                                className=" text-grey text-sm text-[0.85rem] pl-2 pb-1 transition-all"
                                style={{
                                    margin:
                                        values.repeatpass || currentField === "repeatpass"
                                            ? "0px 0px 0px 0px"
                                            : "10px 0px -30px 0px",
                                }}
                            >
                                Repetir senha
                            </p>
                            <Field
                                onFocus={() => setCurrentField("repeatpass")}
                                onBlur={() => setCurrentField("")}
                                name="repeatpass"
                                className={`  px-4 text-sm focus:border-white py-2 bg-transparent text-white w-full border-b border-primary ${
                                    errors.repeatpass && touched.repeatpass ? " border-red" : ""
                                }`}
                            />
                            <ErrorMessage
                                name="repeatpass"
                                component="div"
                                className="text-red absolute"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-8 text-sm  text-black rounded-full bg-primary py-2 border border-primary
                            hover:opacity-75 transition-all active:scale-95"
                        >
                            Criar conta
                        </button>
                        <p
                            className="text-right text-white mb-4 text-sm pr-1 hover:underline  transition-all w-fit ml-auto mr-0 cursor-pointer "
                            onClick={(e) => {
                                e.preventDefault();
                                setView("IN");
                            }}
                        >
                            Já possuo uma conta
                        </p>
                    </Form>
                )}
            </Formik>
            {loading && (
                <img
                    src={AnomalyLogo}
                    className="absolute size-10 animate-spin"
                    draggable={false}
                />
            )}
        </div>
    );
};

const Login: React.FC = () => {
    const [view, setView] = useState<"IN" | "UP">("IN");

    return (
        <div className=" bg-login-screen bg-cover bg-no-repeat flex items-center justify-center gap-[25%] pl-40">
            <div className="bg-black ">
                <img
                    draggable={false}
                    src={Planet}
                    className="absolute left-[13%] w-96 top-[29.66%]"
                    style={{ transform: "scaleX(-1)", opacity: 0.75 }}
                />
                <p className="absolute text-xl top-[40.25%] left-[16.33%] text-white drop-shadow-lg">
                    <span className="pl-4">Bem vindo ao</span>
                    <br />
                    <span className="text-7xl">Oblivion</span>
                </p>
            </div>
            {view === "IN" ? <Signin setView={setView} /> : <Signup setView={setView} />}
        </div>
    );
};

export default Login;
