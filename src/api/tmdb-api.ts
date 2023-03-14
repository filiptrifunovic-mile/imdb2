import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_URL,
});

axiosClient.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      API_KEY: process.env.REACT_APP_TMDB_API_KEY,
    },
  };
});
