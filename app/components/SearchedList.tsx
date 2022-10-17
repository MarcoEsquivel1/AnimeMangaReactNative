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
export const SearchedList = observer(function SearchedList() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [animes, setAnimes] = React.useState([])
  const { animeStore } = useStores()
  useEffect(() => {
    setIsLoading(true)
    setAnimes(animeStore.searchedAnimeList)
    setIsLoading(false)
  }, [animeStore.searchedAnime])
  
  if (isLoading) {
    return (
      <View className="flex-1 items-center" style={$emptyState}>
        <ActivityIndicator />
      </View>
    )
  }

  if (animes.length === 0) {
    return (
      <View></View>
    )
  }
  
  return (
    <View style={{ marginBottom: 10, marginTop: 5 }}>
      <View style={$heading}>
        <Text preset="heading" text="Busqueda" style={{ color: "#fff" }} />
      </View>
      <FlatList
        data={animes}
        extraData={animes.length}
        horizontal={true}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 5 }}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <View className="flex-1 items-center" style={$emptyState}>
              <Text style={$hStyle}>No se encontraron resultados</Text>
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
            canFavorite={false}
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
  marginLeft: 10,
}

const $emptyState: ViewStyle = {
  width: Dimensions.get("window").width / 1.05,
  height: 350,
}
