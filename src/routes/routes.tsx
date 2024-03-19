import { RouteObject } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import Home from "../pages/Home";
import Play from "../pages/Play";
import Game from "../pages/Game";
import Login from "../pages/Login";

import { redirect } from "react-router-dom";
import Requests from "../services/api";
import Collection from "../pages/Collection";

const loader = async (path?: string) => {
    const user = localStorage.getItem("uid");
    const refreshToken = localStorage.getItem("refresh_token");
    if ((!user && path) || (!refreshToken && path)) {
        return redirect(path);
    }
    if (refreshToken) {
        Requests.post("/auth/refresh", { token: refreshToken }).then((res) => {
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
        });
    }
    return null;
};

const publicRoutes: RouteObject[] = [
    {
        id: "Login",
        path: "/login",
        element: <Login />,
        errorElement: <ErrorBoundary />,
    },
];

const privateRoutes: RouteObject[] = [
    {
        id: "init",
        path: "/",
        element: <Play />,
        errorElement: <ErrorBoundary />,
    },
    {
        id: "Jogar",
        path: "/play",
        element: <Play />,
    },
    {
        id: "Início",
        path: "/home",
        element: <Home />,
    },
    {
        id: "Coleção",
        path: "/collection",
        element: <Collection />,
    },
    {
        id: "Pacotes",
        path: "/home",
        element: <Home />,
    },
    {
        id: "Loja",
        path: "/home",
        element: <Home />,
    },
    {
        id: "Game",
        path: "/game",
        element: <Game />,
    },
];

const mountPrivateRoutes = (): RouteObject[] => {
    const routes: RouteObject[] = [];
    privateRoutes.forEach((element) => {
        routes.push({ ...element, loader: async () => loader("/login") });
    });
    return routes;
};
const mountedPrivateRoutes = mountPrivateRoutes();

const Routes = { publicRoutes, mountedPrivateRoutes };

export default Routes;
