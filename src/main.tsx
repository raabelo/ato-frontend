// import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import Routes from "./routes/routes";
import GameProvider from "./contexts/GameContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = document.getElementById("root");

const router = createBrowserRouter([...Routes.publicRoutes, ...Routes.mountedPrivateRoutes]);

ReactDOM.createRoot(root!).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <GameProvider>
            <RouterProvider router={router} />
        </GameProvider>
    </QueryClientProvider>
    // </React.StrictMode>
);
