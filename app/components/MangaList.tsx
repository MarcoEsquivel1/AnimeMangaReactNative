import { observer } from "mobx-react-lite"
import React, {
  FC, useEffect,
} from "react"
import { ActivityIndicator, Dimensions, FlatList,  ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Text,  Toggle, EmptyState, MangaComponent
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { colors, spacing } from "../theme"


/**
 * Describe your component here
 */
export const MangaList = observer(function MangaList() {
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { mangaStore } = useStores()
  useEffect(() => {
    setIsLoading(true)
    mangaStore.fetchMangas()
    setIsLoading(false)
  }, [])

  return (
    <View style={{ marginBottom:10, marginTop: 5  }}>
          <View style={$heading}>
            <Text preset="heading" text="Mangas Trending" />
            {(mangaStore.favoritesOnly || mangaStore.mangas.length > 0) && (
              <View style={$toggle}>
                <Toggle
                  value={mangaStore.favoritesOnly}
                  onValueChange={() =>
                    mangaStore.setProp("favoritesOnly", !mangaStore.favoritesOnly)
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
            data={mangaStore.mangaList}
            extraData={mangaStore.favorites.length + mangaStore.mangaList.length}
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
                    mangaStore.favoritesOnly
                      ? "No hay favoritos"
                      : undefined
                  }
                  content={
                    mangaStore.favoritesOnly
                      ? "Agrega tus mangas favoritos"
                      : undefined
                  }
                  imageStyle={$emptyStateImage}
                  ImageProps={{ resizeMode: "contain" }}
                />
              )
            }
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (<MangaComponent isFavorite={mangaStore.hasFavorite(item)} onPressFavorite={() => mangaStore.toggleFavorite(item)} manga={item} />)}
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

