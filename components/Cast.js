import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Person from "../screens/Person";
import { imageUrl } from "../constants";

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
                    // source={require("../assets/images/moviePoster1.png")}
                    source={{ uri: `${imageUrl}${person.profile_path}` }}
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {person.name && person.name.length > 10
                    ? person.name.slice(0, 10) + "..."
                    : person.name}
                </Text>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
}
