import axios from "axios";

export const axiosInstance= axios.create({
    baseURL: `http://localhost:3690/api/v1`,
}) 