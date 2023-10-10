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
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const [isFavorite, setIsFavorite] = useState(false);

  const { params: item } = useRoute();
  const navigation = useNavigation();
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
          {/* <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23 ,1)",
            ]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absoulte bottom-0"
          /> */}
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
          Moonlight
        </Text>
      </View>
    </ScrollView>
  );
}
