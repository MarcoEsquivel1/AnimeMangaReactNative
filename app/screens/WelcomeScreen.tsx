import { observer } from "mobx-react-lite"
import React, {
  FC, useEffect,
} from "react"
import { ActivityIndicator, Dimensions, FlatList, Image, ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Text, Screen, Toggle, EmptyState
} from "../components"
import { AnimeComponent } from "../components/Anime"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")


export const WelcomeScreen = observer(function WelcomeScreen(
) {
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { animeStore } = useStores()
  useEffect(() => {
    setIsLoading(true)
    animeStore.fetchAnimes()
    setIsLoading(false)
  }, [])

  /* useEffect(() => {
    console.log(animeStore.favorites)
  }, [animeStore.favorites])  */

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <ScrollView style={{flex: 1,}}>
        <View style={{ }}>
          <View style={$heading}>
            <Text preset="heading" text="Animes" />
            {(animeStore.favoritesOnly || animeStore.animeList.length > 0) && (
              <View style={$toggle}>
                <Toggle
                  value={animeStore.favoritesOnly}
                  onValueChange={() =>
                    animeStore.setProp("favoritesOnly", !animeStore.favoritesOnly)
                  }
                  variant="switch"
                  label="Favoritos"
                  labelPosition="left"
                  labelStyle={$labelStyle}
                />
              </View>
            )}
          </View>
          <FlatList 
            data={animeStore.animes}
            extraData={animeStore.favorites.length + animeStore.animeList.length}
            horizontal={true}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            ListEmptyComponent={
              isLoading ? (
                <ActivityIndicator />
              ) : (
                <EmptyState
                  preset="generic"
                  style={$emptyState}
                  heading={
                    animeStore.favoritesOnly
                      ? "No hay favoritos"
                      : undefined
                  }
                  content={
                    animeStore.favoritesOnly
                      ? "Agrega tus animes favoritos"
                      : undefined
                  }
                  imageStyle={$emptyStateImage}
                  ImageProps={{ resizeMode: "contain" }}
                />
              )
            }
            renderItem={({item}) => (<AnimeComponent isFavorite={animeStore.hasFavorite(item)} onPressFavorite={() => animeStore.toggleFavorite(item)} anime={item} />)}
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

const $heading: ViewStyle = {
  marginBottom: spacing.medium,
}

const $toggle: ViewStyle = {
  marginTop: spacing.micro,
  flex: 1,
  marginRight: spacing.medium,
}

const $labelStyle: TextStyle = {
  textAlign: "right",
}

const $emptyState: ViewStyle = {
  marginTop: spacing.huge,
  width: Dimensions.get("window").width/1.05,
}
const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}