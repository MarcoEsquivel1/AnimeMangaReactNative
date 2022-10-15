import * as React from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { Anime } from "../models/Anime"
import { AutoImage } from "./AutoImage"

export interface AnimeProps {
  style?: StyleProp<ViewStyle>
  anime: Anime,
}

export const AnimeComponent = observer(function Anime(props: AnimeProps) {
  const { anime } = props
  const {width} = Dimensions.get('window');
  return (
    <View
            style={{ marginBottom: 10, flexGrow: 0, marginHorizontal: 10}}
        >
      <AutoImage source={{uri: anime.posterImage.small}} />
      <Text style={{width: width/2}} numberOfLines={1} ellipsizeMode="tail" text={anime.canonicalTitle} />
    </View>
  )
})

