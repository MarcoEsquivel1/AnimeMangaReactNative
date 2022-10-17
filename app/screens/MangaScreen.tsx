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
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Manga: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Manga" component={MangaScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const MangaScreen: FC<StackScreenProps<AppStackScreenProps, "Manga">> = observer(function MangaScreen(props) {
  const { manga } = props.route.params
  const PADDING = 20
  const { width } = Dimensions.get("window")
  const ITEM_WIDTH = width
  const image =
    manga.posterImage != null
      ? { uri: manga.posterImage.medium }
      : require("../../assets/images/error.jpg")
      const styles = StyleSheet.create({
        image: {
          width: ITEM_WIDTH,
          height: 470,
        },
      })
  if (!manga) {
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
                  {manga.canonicalTitle}
                </Text>
              </View>
            </View>
            <Animated.View 
            entering={FadeInDown.delay(300)}
            exiting={FadeOut}
            >
              <SharedElement id={`item.${manga.id}.photo2`} className="absolute top-0 right-0 z-10">
                  <Image source={image} style={styles.image} />
              </SharedElement>
            </Animated.View>
          </View>
        </View>
        <View>
          <View className="flex-col justify-between items-center p-2">
            <Text className="text-white font-semibold text-2xl">Sinopsis</Text>
            <Text className="text-white font-semibold">{manga.synopsis}</Text>
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
