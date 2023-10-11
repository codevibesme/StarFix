import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";
import { useNavigation, useRoute } from "@react-navigation/native";
import { imageUrl } from "../constants";
import { fetchPeople, fetchPersonMovies } from "../api/moviedb";
import LoadingScreen from "./LoadingScreen";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

export default function Person() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState(null);
  const { params: person } = useRoute();
  const navigation = useNavigation();

  const fetchPeopleMovies = async () => {
    const peopleResponse = await fetchPeople(person.id);
    const movieResponse = await fetchPersonMovies(person.id);
    setCast(peopleResponse);
    setPersonMovies(movieResponse);
  };
  useEffect(() => {
    setTimeout(() => fetchPeopleMovies(), 2000);
  }, [person]);

  return (
    <>
      {cast ? (
        <ScrollView
          className="flex-1 bg-neutral-900"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* back button and heart icon */}
          <SafeAreaView
            className={
              "px-4 w-full flex-row justify-between items-center" +
              verticalMargin
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

          {/* Person details */}

          <View>
            <View className="flex-row justify-center">
              <View className="items-center overflow-hidden rounded-full h-72 w-72 border-2 border-neutral-500">
                <Image
                  // source={require("../assets/images/moviePoster1.png")}
                  source={{ uri: `${imageUrl}${cast.profile_path}` }}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-3xl text-white font-bold text-center">
                {cast.name}
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                {cast.place_of_birth}
              </Text>
              <View className="mx-3 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full p-3">
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Gender</Text>
                  <Text className="text-neutral-300 text-sm">
                    {cast.gender}
                  </Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Birthday</Text>
                  <Text className="text-neutral-300 text-sm">
                    {cast.birthday}
                  </Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Known for</Text>
                  <Text className="text-neutral-300 text-sm">
                    {cast.known_for_department}
                  </Text>
                </View>
                <View className="px-2 items-center">
                  <Text className="text-white font-semibold">Popularity</Text>
                  <Text className="text-neutral-300 text-sm">
                    {cast.popularity}
                  </Text>
                </View>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-xl">Biography</Text>
              <Text className="text-base text-neutral-400 text-lg tracking-wide">
                {cast.biography}
              </Text>
            </View>
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 bg-neutral-900">
          <LoadingScreen />
        </View>
      )}
    </>
  );
}
