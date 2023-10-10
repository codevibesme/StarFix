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
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);

  const { params: item } = useRoute();
  const navigation = useNavigation();

  let movieName = "MoonLight";

  useEffect(() => {
    // call the api
  }, [item]);

  return (
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
            source={require("../assets/images/moviePoster1.png")}
            style={{ width: width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
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
          {movieName}
        </Text>
        {/* Release Date, status runtime */}
        <Text className=" text-neutral-400 font-semibold text-base text-center">
          Released &#x2022; 2020 &#x2022; 170 min
        </Text>
        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action &#x2022;
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy &#x2022;
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill
          </Text>
        </View>
        {/* Description */}

        <Text className="text-neutral-400 mx-4 tracking-wide">
          Chiron, a young African-American boy, finds guidance in Juan, a drug
          dealer, who teaches him to carve his own path. As he grows up in
          Miami, Juan's advice leaves a lasting impression on him.
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
  );
}
