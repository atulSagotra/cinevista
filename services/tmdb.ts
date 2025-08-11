import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWQwNWY5MDQ3Y2VjZGI3ZjUzNDU2ZDkxMDExNTgxYiIsIm5iZiI6MTc1NDg3MjU3Ny41MTUsInN1YiI6IjY4OTkzYjAxN2U0MzUxNDEwZmI2ZmYzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M3ALkaQQLF-up7mQVXEO9UZ13gb3Fb5E0Ju_-s7LKXM`
  }
});

export const getPopularMovies = async () => {
  const response = await tmdbApi.get("/movie/popular");
  return response.data.results;
};

export const getMovieDetails = async (id: number) => {
  const response = await tmdbApi.get(`/movie/${id}`);
  return response.data;
};
