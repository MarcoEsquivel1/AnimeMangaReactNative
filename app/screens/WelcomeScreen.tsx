import { observer } from "mobx-react-lite"
import React, {
  FC, useEffect,
} from "react"
import { ScrollView, StatusBar, ViewStyle } from "react-native"
import {
  Screen,
} from "../components"
import { AnimeList } from "../components/AnimeList"
import { MangaList } from "../components/MangaList"



export const WelcomeScreen = observer(function WelcomeScreen(
) {
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <StatusBar hidden />
      <ScrollView className="py-7 " style={{flex: 1,}}>
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
}