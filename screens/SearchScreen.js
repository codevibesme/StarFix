import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { fetchSearchResults } from "../api/moviedb";
import { imageUrl } from "../constants";

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const fetchResults = async () => {
    if (query !== "") {
      const response = await fetchSearchResults(query);
      setResults(response);
    }
    if (query === "") setResults([]);
  };

  useEffect(() => {
    fetchResults();
  }, [query]);
  let movieName = "Moonlight";
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          onChangeText={(newQuery) => setQuery(newQuery)}
        />
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          className="rounded-full p3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </Pressable>
      </View>
      {results.length === 0 && (
        <View className="flex-row justify-center mt-10 p-2">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="w-96 h-96"
          />
        </View>
      )}
      {results.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length}){" "}
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      // source={require("../assets/images/moviePoster1.png")}
                      source={{ uri: `${imageUrl}${item.poster_path}` }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item && item.length > 22
                        ? item.name.slice(0, 22)
                        : item.name}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
