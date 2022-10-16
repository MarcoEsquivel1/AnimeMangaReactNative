import { observer } from "mobx-react-lite"
import React, {
  FC, useEffect,
} from "react"
import { ScrollView, ViewStyle } from "react-native"
import {
  Screen,  AnimeList
} from "../components"



export const WelcomeScreen = observer(function WelcomeScreen(
) {
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <ScrollView style={{flex: 1,}}>
        <AnimeList />
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