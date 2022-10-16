import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, StatusBar, TouchableOpacity, View, ViewStyle, StyleSheet, Text } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../navigators"
import { Screen } from "../components"
import Animated, { Layout, SlideInDown, SlideInRight, SlideInUp, SlideOutDown, SlideOutRight, ZoomIn } from "react-native-reanimated"
import { MaterialCommunityIcons } from "@expo/vector-icons"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Anime: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Anime" component={AnimeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AnimeScreen: FC<StackScreenProps<AppStackScreenProps, "Anime">> = observer(function AnimeScreen(props) {
  const { anime } = props.route.params
  const image = anime.posterImage != null ? { uri: anime.posterImage.small} : require("../../assets/images/error.jpg")
  const styles = StyleSheet.create({
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "flex-end",
    },
  })
  if (!anime) {
    goBack()
  }

  return (
    // <Screen style={$root} preset="scroll">
      // <Text text={anime?.canonicalTitle} />
      <View
            className="h-full flex-col bg-black">
            <View className="h-3/5">
                <Animated.View 
                    entering={ZoomIn.delay(300)}
                    className="absolute top-1/2 right-0 z-10 backdrop-blur-lg bg-white/50 px-3">
                    <TouchableOpacity
                        onPress={() => {}} 
                        className="flex-row"
                    >
                            <MaterialCommunityIcons name="play" size={35} color={'red'} />
                            <Text className="self-center font-bold text-lg" style={{color:'red'}}> Ver video</Text>
                    </TouchableOpacity>
                </Animated.View>
            <StatusBar hidden />
                <ImageBackground
                    source={image} style={styles.image}
                >
                    <View 
                    className="flex-col p-2 backdrop-blur-lg bg-transparent/50 h-2/6"
                    >
                        <View className="1/2">
                            <Text className="text-white font-semibold text-2xl text-center">{anime.canonicalTitle}</Text>
                        </View>
                        <View className="1/2 ">
                            <Text className="text-white font-semibold text-center capitalize">
                                {}
                            </Text>
                        </View>
                </View>
                </ImageBackground>
            </View>
        </View>
    // </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
