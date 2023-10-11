import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import { imageUrl } from "../constants/index.js";
import { fetchGenres, fetchCast, fetchSimilarMoviesApi } from "../api/moviedb";
import LoadingScreen from "./LoadingScreen";

var { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";

const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4]);
  const [genres, setGenres] = useState(new Map());
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(true);

  const { params: item } = useRoute();
  const navigation = useNavigation();

  const fetchGenresMovies = async () => {
    const genreMap = await fetchGenres();
    setGenres(genreMap);
  };
  const fetchCastMovies = async () => {
    const castResponse = await fetchCast(item.id);
    setCast(castResponse);
  };
  const fetchSimilarMovies = async () => {
    const movies = await fetchSimilarMoviesApi(item.id);

    setSimilarMovies(movies);
  };
  useEffect(() => {
    // call the api
    setLoading(true);
    setTimeout(() => {
      fetchCastMovies();
      fetchGenresMovies();
      fetchSimilarMovies();
      setLoading(false);
    }, 2000);
  }, [item]);

  return (
    <>
      {loading ? (
        <View className="flex-1 bg-neutral-900">
          <LoadingScreen />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="flex-1 bg-neutral-900"
        >
          {/* back button and movie poster */}
          <View className="w-full">
            <SafeAreaView
              className={
                "absolute z-20 px-4 w-full flex-row justify-between items-center" +
                topMargin
              }
            >
              <Pressable
                style={styles.background}
                className="rounded-xl p-1"
                onPress={() => navigation.goBack()}
              >
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
              </Pressable>
              <Pressable onPress={() => setIsFavorite(!isFavorite)}>
                <HeartIcon size="35" color={isFavorite ? "red" : "white"} />
              </Pressable>
            </SafeAreaView>
            <View>
              <Image
                // source={require("../assets/images/moviePoster1.png")}
                source={{ uri: `${imageUrl}${item.poster_path}` }}
                style={{ width: width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          </View>
          {/* movie details */}
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            {/*title*/}
            <Text className="text-white text-center text-3xl font-bold tracking-wider">
              {item.title}
            </Text>
            {/* Release Date, status runtime */}
            <Text className=" text-neutral-400 font-semibold text-base text-center">
              {item.release_date} &#x2022; {item.original_language}
            </Text>
            {/* genres */}
            <View className="flex-row justify-center mx-4 space-x-2">
              {item.genre_ids &&
                item.genre_ids.map((genre) => {
                  return (
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                      {genres && genres.get(genre)}
                    </Text>
                  );
                })}
            </View>

            {/* Description */}
            <Text className="text-neutral-400 mx-4 tracking-wide">
              {item.overview}
            </Text>
          </View>
          <Cast cast={cast} navigation={navigation} />
          {/* Similar Movies  */}
          <MovieList
            title="Similar Movies"
            data={similarMovies}
            hideSeeAll={true}
          />
        </ScrollView>
      )}
    </>
  );
}
