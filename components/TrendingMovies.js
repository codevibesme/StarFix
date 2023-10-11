import { View, Text, Pressable, Dimensions, Image } from "react-native";
import React, { useEffect } from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { fetchTrendingMovies } from "../api/moviedb";
import { imageUrl } from "../constants/index";

var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ index, item }) => <MovieCard key={index} item={item} />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item }) => {
  const navigation = useNavigation();
  console.log(imageUrl + item.poster_path);
  return (
    <Pressable onPress={() => navigation.navigate("Movie", item)}>
      {/* <Text className="text-white">Movie</Text>
       */}
      <Image
        // source={require("../assets/images/moviePoster1.png")}
        source={{ uri: `${imageUrl}${item.poster_path}` }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
      />
    </Pressable>
  );
};
