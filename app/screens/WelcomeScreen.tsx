import { observer } from "mobx-react-lite"
import React, {
  FC, useEffect,
} from "react"
import { Dimensions, FlatList, Image, ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Text, Screen
} from "../components"
import { AnimeComponent } from "../components/Anime"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")


export const WelcomeScreen = observer(function WelcomeScreen(
) {
  const {height} = Dimensions.get('window');
  const { animeStore } = useStores()
  useEffect(() => {
    animeStore.fetchAnimes()
  }, [])
  
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <ScrollView style={{flex: 1,}}>
        <View style={{ }}>
          <FlatList 
            data={animeStore.animeList}
            horizontal={true}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            renderItem={({item}) => <AnimeComponent anime={item} />}
          />
        
        </View>
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

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
}

const $bottomContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
