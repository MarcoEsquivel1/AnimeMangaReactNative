import * as React from "react"
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "./Text"
import { Manga } from "../models/Manga"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { SharedElement } from "react-navigation-shared-element"

export interface MangaProps {
  style?: StyleProp<ViewStyle>
  manga: Manga
  isFavorite?: boolean
  onPressFavorite?: () => void
  canFavorite?: boolean
}

/**
 * Describe your component here
 */
export const MangaComponent = observer(function Manga({
  manga,
  isFavorite,
  onPressFavorite,
  canFavorite,
}: {
  manga: Manga
  isFavorite?: boolean
  onPressFavorite?: () => void
  canFavorite?: boolean
}) {
  const { width } = Dimensions.get("window")
  const PADDING = 20
  const ITEM_WIDTH = width / 1.1
  const image =
    manga.posterImage != null
      ? { uri: manga.posterImage.small }
      : require("../../assets/images/error.jpg")
  const [liked, setliked] = React.useState(isFavorite)
  React.useEffect(() => {
    setliked(isFavorite)
  }, [])

  const styles = StyleSheet.create({
    image: {
      borderRadius: 24,
      width: ITEM_WIDTH,
      height: 350,
    },
  })

  const handlePressFavorite = () => {
    setliked(!liked)
    onPressFavorite()
  }

  return (
    <TouchableOpacity onPress={manga.navigate}>
      <View
        style={{
          marginBottom: 10,
          flexGrow: 0,
          marginHorizontal: 10,
          width: ITEM_WIDTH,
          height: 350,
          borderRadius: 24,
          overflow: "hidden",
        }}
      >
        <View className="flex-col p-2 backdrop-blur-lg bg-transparent/50 rounded-b-3xl h-1/6 absolute bottom-0 z-20">
          <View className="h-full">
            <Text
              style={{ width: ITEM_WIDTH }}
              className="text-white font-semibold text-lg"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {manga.canonicalTitle}
            </Text>
          </View>
        </View>
        {canFavorite && (
          <TouchableOpacity
            className="absolute top-0 right-0 bg-transparent/50 rounded-3xl p-5 z-20"
            onPress={() => {
              handlePressFavorite()
            }}
          >
            <View>
              <MaterialCommunityIcons name="star" size={35} color={liked ? "yellow" : "white"} />
            </View>
          </TouchableOpacity>
        )}
        <SharedElement id={`item.${manga.id}.photo2`} className="absolute top-0 right-0 z-10">
          <Image source={image} style={styles.image} />
        </SharedElement>
      </View>
    </TouchableOpacity>
  )
})
