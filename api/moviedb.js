import { apiKey } from "../constants/index.js";
import { accessToken } from "../constants/index.js";
const baseUrl = "https://api.themoviedb.org/3";

const trendingMoviesEndPoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(endpoint, options);
    const { results } = await response.json();
    return results;
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchGenres = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=d45225bbacae93aeefbbc72e536dbc7c",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { genres } = await response.json();
  let genreMap = new Map();
  genres.map((item) => genreMap.set(item.id, item.name));

  return genreMap;
};
export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};
