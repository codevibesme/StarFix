import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
var { width, height } = Dimensions.get("window");
import { theme } from "../theme";
export default function LoadingScreen() {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
}
