import * as React from "react"
import { Dimensions, ImageBackground, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { Anime } from "../models/Anime"
import { AutoImage } from "./AutoImage"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useStores } from "../models"
import { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"

export interface AnimeProps {
  style?: StyleProp<ViewStyle>
  anime: Anime,
  isFavorite?: boolean,
  onPressFavorite?: () => void
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
})

export const AnimeComponent = observer(function Anime({anime, isFavorite, onPressFavorite}: {anime: Anime, isFavorite?: boolean, onPressFavorite?: () => void}) {
  const { width } = Dimensions.get("window")
  const image = anime.posterImage != null ? { uri: anime.posterImage.small } : require("../../assets/images/error.jpg")
  /* console.log(isFavorite); */
  const [liked, setliked] = React.useState(isFavorite);
  React.useEffect(() => {
    setliked(isFavorite)
  }, [])
  


  const handlePressFavorite = () => { 
    setliked(!liked)
    onPressFavorite()
  }

  return (
    <View
      style={{
        marginBottom: 10,
        flexGrow: 0,
        marginHorizontal: 10,
        width: width / 1.5,
        height: width / 1.1,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <ImageBackground source={image} style={styles.image} imageStyle={{ borderRadius: 24 }}>
        <View className="flex-col p-2 backdrop-blur-lg bg-transparent/50 rounded-b-3xl h-1/6 ">
          <View className="h-full">
            <Text
              style={{ width: width / 2 }}
              className="text-white font-semibold text-lg"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {anime.canonicalTitle}
            </Text>
          </View>
        </View>
        
          <TouchableOpacity className="absolute top-0 right-0 bg-transparent/50 rounded-3xl p-5"
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
      </ImageBackground>
    </View>
  )
})
