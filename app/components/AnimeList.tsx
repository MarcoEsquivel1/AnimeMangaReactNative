import { observer } from "mobx-react-lite"
import React, {
  FC, useEffect,
} from "react"
import { ActivityIndicator, Dimensions, FlatList,  ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Text,  Toggle, EmptyState, 
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { colors, spacing } from "../theme"
import { AnimeComponent } from "./Anime"

/**
 * Describe your component here
 */
export const AnimeList = observer(function AnimeList() {
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { animeStore } = useStores()
  useEffect(() => {
    setIsLoading(true)
    animeStore.fetchAnimes()
    setIsLoading(false)
  }, [])

  return (
    <View style={{ marginBottom: 10, marginTop: 5 }}>
          <View style={$heading}>
            <Text preset="heading" text="Animes" />
            {(animeStore.favoritesOnly || animeStore.animes.length > 0) && (
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
            data={animeStore.animeList}
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
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (<AnimeComponent isFavorite={animeStore.hasFavorite(item)} onPressFavorite={() => animeStore.toggleFavorite(item)} anime={item} />)}
          />
        </View>
  )
})

const $heading: ViewStyle = {
  marginBottom: spacing.medium,
  marginLeft: spacing.medium,
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

