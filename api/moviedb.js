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
    `${baseUrl}/genre/movie/list?api_key=${apiKey}`,
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

export const fetchCast = async (id) => {
  const response = await fetch(
    `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { cast } = await response.json();
  return cast;
};

export const fetchPeople = async (id) => {
  const response = await fetch(`${baseUrl}/person/${id}?api_key=${apiKey}`);
  return await response.json();
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

export const fetchPersonMovies = async (id) => {
  const response = await fetch(
    `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { cast } = await response.json();
  return cast;
};

export const fetchSimilarMoviesApi = async (id) => {
  const response = await fetch(
    `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { results } = await response.json();
  return results;
};

export const fetchSearchResults = async (query) => {
  const response = await fetch(
    `${baseUrl}/search/movie?query=${query}&api_key=${apiKey}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { results } = await response.json();
  console.log(results);
  return results;
};
