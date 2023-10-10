import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Person from "../screens/Person";
export default function Cast({ cast, navigation }) {
  let personName = "Keanu Reevers";
  let characterName = "John Wick";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <Pressable
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.push("Person", person)}
              >
                <View className="rounded-full overflow-hidden h-20 w-20">
                  <Image
                    className="h-24 w-20"
                    source={require("../assets/images/moviePoster1.png")}
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
                </Text>
                <Text className="text-white text-xs mt-1">
                  {characterName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
}
