import * as React from "react"
import { Dimensions, ImageBackground, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "./Text"
import { Anime } from "../models/Anime"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { SharedElement, createSharedElementStackNavigator } from "react-navigation-shared-element"

export interface AnimeProps {
  style?: StyleProp<ViewStyle>
  anime: Anime,
  isFavorite?: boolean,
  onPressFavorite?: () => void
}


export const AnimeComponent = observer(function Anime({anime, isFavorite, onPressFavorite}: {anime: Anime, isFavorite?: boolean, onPressFavorite?: () => void}) {
  const { width } = Dimensions.get("window")
  const PADDING = 20
  const ITEM_WIDTH = width /1.1
  const image = anime.posterImage != null ? { uri: anime.posterImage.small } : require("../../assets/images/error.jpg")
  /* console.log(isFavorite); */
  const [liked, setliked] = React.useState(isFavorite);
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
    <TouchableOpacity onPress={anime.navigate}
    >
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
                style={{ width: ITEM_WIDTH}}
                className="text-white font-semibold text-lg"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {anime.canonicalTitle}
              </Text>
            </View>
          </View>
          
            <TouchableOpacity className="absolute top-0 right-0 bg-transparent/50 rounded-3xl p-5 z-20"
              onPress={() => { handlePressFavorite() }}
            >
              <View >
                <MaterialCommunityIcons
                  name="star"
                  size={35}
                  color={liked ? "yellow" : "white"}
                />
              </View>
            </TouchableOpacity>
            <SharedElement id={`item.${anime.id}.photo`}  className="absolute top-0 right-0 z-10">
              <Image source={image} style={styles.image} />
            </SharedElement>
      </View>
    </TouchableOpacity>
  )
})
