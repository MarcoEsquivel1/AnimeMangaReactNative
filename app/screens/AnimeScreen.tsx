import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  Image,
  StatusBar,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../navigators"
import { Screen } from "../components"
import Animated, {
  FadeInDown,
  FadeOut,
  ZoomIn,
} from "react-native-reanimated"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { SharedElement } from "react-native-shared-element"


// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AnimeScreen: FC<StackScreenProps<AppStackScreenProps, "Anime">> = observer(
  function AnimeScreen(props) {
    const { anime } = props.route.params
    const { width } = Dimensions.get("window")
    const PADDING = 20
    const ITEM_WIDTH = width
    const image =
      anime.posterImage != null
        ? { uri: anime.posterImage.medium }
        : require("../../assets/images/error.jpg")
        const styles = StyleSheet.create({
          image: {
            width: ITEM_WIDTH,
            height: 470,
          },
        })
    if (!anime) {
      goBack()
    }

    return (
      <Screen  style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <StatusBar hidden />
      <ScrollView className="bg-black" style={{flex: 1,}}>
        <View className="flex-1 bg-withe" style={{height: 470}}>
          <View className="h-full">
            <Animated.View
              entering={ZoomIn.delay(300)}
              className="absolute top-1/2 right-0 z-30 backdrop-blur-lg bg-white/50 px-3"
            >
              <TouchableOpacity onPress={() => {}} className="flex-row ">
                <MaterialCommunityIcons name="play" size={35} color={"red"} />
                <Text className="self-center font-bold text-lg" style={{ color: "red" }}>
                  {" "}
                  Ver video
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <StatusBar hidden />
            <View className="flex-col w-full absolute bottom-0 z-30 p-2 backdrop-blur-lg bg-transparent/50 h-1/6">
              <View className="1/2">
                <Text className="text-white font-semibold text-2xl text-center">
                  {anime.canonicalTitle}
                </Text>
              </View>
            </View>
            <Animated.View 
            entering={FadeInDown.delay(300)}
            exiting={FadeOut}
            >
              <SharedElement id={`item.${anime.id}.photo`} className="absolute top-0 right-0 z-10">
                  <Image source={image} style={styles.image} />
              </SharedElement>
            </Animated.View>
          </View>
        </View>
        <View>
          <View className="flex-col justify-between items-center p-2">
            <Text className="text-white font-semibold text-2xl">Sinopsis</Text>
            <Text className="text-white font-semibold">{anime.synopsis}</Text>
          </View>

        </View>
      </ScrollView>
    </Screen>
    )
  },
)


const $root: ViewStyle = {
  flex: 1,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
}