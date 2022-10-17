import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import {
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native"
import Animated, { Layout, SlideInLeft, ZoomOut } from "react-native-reanimated"
import { Screen, SearchedList } from "../components"
import { AnimeList } from "../components/AnimeList"
import { MangaList } from "../components/MangaList"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useStores } from "../models"

const styles = StyleSheet.create({
  input: {
    borderRadius: 14,
    backgroundColor: "grey",
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: "80%",
  },
})

export const WelcomeScreen = observer(function WelcomeScreen() {
  const [text, onChangeText] = useState("")
  const { animeStore } = useStores()
  return (
    <Screen
      style={$root}
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={$screenContentContainer}
    >
      <StatusBar hidden />
      <Animated.View
        entering={SlideInLeft.delay(300)}
        exiting={ZoomOut}
        layout={Layout.springify().delay(200)}
        className="flex-row flex items-center mt-5 w-full px-4"
      >
        <TextInput
          placeholder="Buscar anime"
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableOpacity onPress={() => {
          animeStore.searchAnime(text)        
        }}>
          <View className="self-end" style={{ backgroundColor: "red", borderRadius: 5 }}>
            <MaterialCommunityIcons name="magnify" size={35} color={"white"} />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <ScrollView className="py-7 bg-black " style={{ flex: 1 }}>
        <SearchedList />
        <AnimeList />
        <MangaList />
      </ScrollView>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "black",
}
