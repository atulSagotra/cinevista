// tmdb.ts
// Handles all calls to The Movie Database (TMDb) API.
// Author: <Your Name> - Built as a reusable service layer for movie data.

// -------------------- Imports -------------------- //
import axios from "axios";

// -------------------- Constants -------------------- //
// Base API URL for TMDb
const BASE_URL = "https://api.themoviedb.org/3";

// It's best to keep your API token in a .env file — but for dev/demo, we're hardcoding here.
// ⚠️ Never ship your token in production code.
const BEARER_TOKEN = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWQwNWY5MDQ3Y2VjZGI3ZjUzNDU2ZDkxMDExNTgxYiIsIm5iZiI6MTc1NDg3MjU3Ny41MTUsInN1YiI6IjY4OTkzYjAxN2U0MzUxNDEwZmI2ZmYzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M3ALkaQQLF-up7mQVXEO9UZ13gb3Fb5E0Ju_-s7LKXM`;

// -------------------- Axios Instance -------------------- //
// Create a pre-configured axios instance so all calls share the same base settings.
export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: BEARER_TOKEN
  }
});

// -------------------- API Methods -------------------- //

/**
 * Fetch a list of currently popular movies.
 * Uses TMDB's /movie/popular endpoint.
 */
export const getPopularMovies = async () => {
  const response = await tmdbApi.get("/movie/popular?language=en-US&page=1");
  return response.data.results; // only returning the `results` array
};

/**
 * Fetch a list of movies currently playing in theatres.
 * Uses the /movie/now_playing endpoint.
 */
export const getNowPlayingMovies = async () => {
  const response = await tmdbApi.get("/movie/now_playing?language=en-US&page=1");
  return response.data.results;
};

/**
 * Fetch a list of upcoming movies (future release dates).
 * Uses the /movie/upcoming endpoint.
 */
export const getUpcomingMovies = async () => {
  const response = await tmdbApi.get("/movie/upcoming?language=en-US&page=1");
  return response.data.results;
};

/**
 * Fetch detailed info for a single movie, by its TMDb ID.
 * For example: title, overview, genres, release date, runtime, etc.
 * You could extend this to also fetch credits (cast/crew) if desired.
 */
export const getMovieDetails = async (movieId: number) => {
  const response = await tmdbApi.get(`/movie/${movieId}?language=en-US`);
  return response.data;
};
