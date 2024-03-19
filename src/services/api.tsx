import axios from "axios";

const Requests = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        "Content-Type": "application/json",
    },
});

// interceptator that inserts the access token on every request
Requests.interceptors.request.use((request) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

// interceptator for error handling and refreshing access token
Requests.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // refreshes access token if 401 (Forbidden)
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== "/auth/login"
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                Requests.post("/refresh", { refreshToken: refreshToken }).then(async (res) => {
                    localStorage.setItem("access_token", res.data.access_token);
                    localStorage.setItem("refresh_token", res.data.refresh_token);
                });
            }

            return originalRequest;
        }

        return Promise.reject(error);
    }
);

export default Requests;
