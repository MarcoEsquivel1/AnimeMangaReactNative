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
import { Text, Toggle, EmptyState, MangaComponent } from "../components"
import { useStores } from "../models"
import { spacing } from "../theme"

/**
 * Describe your component here
 */
export const MangaList = observer(function MangaList() {
  const [isLoading, setIsLoading] = React.useState(false)
  const { mangaStore } = useStores()
  useEffect(() => {
    setIsLoading(true)
    mangaStore.fetchMangas()
    setIsLoading(false)
  }, [])

  return (
    <View style={{ marginBottom: 40, marginTop: 5 }}>
      <View style={$heading}>
        <Text preset="heading" text="Mangas" style={{ color: "#fff" }} />
        {(mangaStore.favoritesOnly || mangaStore.mangas.length > 0) && (
          <View style={$toggle}>
            <Toggle
              value={mangaStore.favoritesOnly}
              onValueChange={() => mangaStore.setProp("favoritesOnly", !mangaStore.favoritesOnly)}
              variant="switch"
              label="Favoritos"
              labelPosition="left"
              labelStyle={$labelStyle}
            />
          </View>
        )}
      </View>
      <FlatList
        data={mangaStore.mangaList}
        extraData={mangaStore.favorites.length + mangaStore.mangaList.length}
        horizontal={true}
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
          <MangaComponent
            isFavorite={mangaStore.hasFavorite(item)}
            onPressFavorite={() => mangaStore.toggleFavorite(item)}
            manga={item}
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