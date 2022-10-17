import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import {
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Text, Toggle } from "../components"
import { useStores } from "../models"
import { spacing } from "../theme"
import { AnimeComponent } from "./Anime"

/**
 * Describe your component here
 */
export const AnimeList = observer(function AnimeList() {
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
        <Text preset="heading" text="Animes" style={{ color: "#fff" }} />
        {(animeStore.favoritesOnly || animeStore.animes.length > 0) && (
          <View style={$toggle}>
            <Toggle
              value={animeStore.favoritesOnly}
              onValueChange={() => animeStore.setProp("favoritesOnly", !animeStore.favoritesOnly)}
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
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 5 }}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <View className="flex-1 items-center" style={$emptyState}>
              <Text style={$hStyle}>No hay animes favoritos</Text>
              <Image className="mt-5" source={require("../../assets/images/error.png")} />
            </View>
          )
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimeComponent
            isFavorite={animeStore.hasFavorite(item)}
            onPressFavorite={() => animeStore.toggleFavorite(item)}
            anime={item}
            canFavorite={true}
          />
        )}
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
  color: "#fff",
}
const $hStyle: TextStyle = {
  textAlign: "center",
  color: "#fff",
  fontSize: 20,
}

const $emptyState: ViewStyle = {
  width: Dimensions.get("window").width / 1.05,
  height: 350,
}