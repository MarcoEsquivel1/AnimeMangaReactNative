import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  Image,
  StatusBar,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
  Linking,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../navigators"
import { Screen } from "../components"
import Animated, {
  FadeInDown,
  FadeOut,
  ZoomIn,
} from "react-native-reanimated"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { SharedElement } from "react-native-shared-element"
import { useStores } from "../models"
import { FlatList } from "react-native-gesture-handler"


// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AnimeScreen: FC<StackScreenProps<AppStackScreenProps, "Anime">> = observer(
  function AnimeScreen(props) {
    const [characters, setCharacters] = React.useState([])
    const { animeStore } = useStores()
    const { anime } = props.route.params
    const { width } = Dimensions.get("window")
    const PADDING = 20
    const ITEM_WIDTH = width
    const image =
      anime.posterImage != null
        ? { uri: anime.posterImage.medium }
        : require("../../assets/images/error.jpg")
        const styles = StyleSheet.create({
          image: {
            width: ITEM_WIDTH,
            height: 470,
          },
          image2: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'flex-end',
            marginHorizontal:10
        }
        })
    if (!anime) {
      goBack()
    }

    useEffect(() => {
      anime.fetchEpisodes()
      anime.fetchCharacters()
    }, [anime.id])

    useEffect(() => {
      setCharacters(anime.characterList)
    }, [anime.characters])

    return (
      <Screen  style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <StatusBar hidden />
      <ScrollView className="bg-black" style={{flex: 1,}}>
        <View className="flex-1 bg-withe" style={{height: 470}}>
          <View className="h-full">
            <Animated.View
              entering={ZoomIn.delay(300)}
              className="absolute top-1/2 right-0 z-30 backdrop-blur-lg bg-white/50 px-3"
            >
              <TouchableOpacity onPress={() => {
                if (anime.youtubeVideoId) {
                  Linking.openURL('vnd.youtube://'+anime.youtubeVideoId)
                }
              }} className="flex-row ">
                <MaterialCommunityIcons name="play" size={35} color={"red"} />
                <Text className="self-center font-bold text-lg" style={{ color: "red" }}>
                  {" "}
                  Ver video
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <StatusBar hidden />
            <View className="flex-col w-full absolute bottom-0 z-30 p-2 backdrop-blur-lg bg-transparent/50 h-1/6">
              <View className="1/2">
                <Text className="text-white font-semibold text-2xl text-center">
                  {anime.canonicalTitle}
                </Text>
              </View>
            </View>
            <Animated.View 
            entering={FadeInDown.delay(300)}
            exiting={FadeOut}
            >
              <SharedElement id={`item.${anime.id}.photo`} className="absolute top-0 right-0 z-10">
                  <Image source={image} style={styles.image} />
              </SharedElement>
            </Animated.View>
          </View>
        </View>
        <View>
          <View className="flex-col justify-between items-center p-2">
            <Text className="text-white font-semibold text-2xl">Sinopsis</Text>
            <Text className="text-white font-semibold">{anime.synopsis}</Text>
          </View>

        </View>
        <View>
          <Text className="text-white font-semibold text-2xl mx-3 my-5">Episodes</Text>
          <FlatList 
          horizontal={true}
          data={anime.episodes}
          
          renderItem={({item}) => (
            item == null ? null : (
              item.canonicalTitle != null ? (
              <ImageBackground source={item.thumbnail != null && item.thumbnail.original != null ? {uri: item.thumbnail.original} : require("../../assets/images/error.png")} style={styles.image2} imageStyle={{borderRadius: 24,}}>
                <View 
                    className="flex-col p-2 backdrop-blur-lg bg-transparent/50 rounded-b-3xl h-32 w-32"
                >
                    <View className="h-full">
                        <Text numberOfLines={2} ellipsizeMode="tail" className="text-white font-semibold">{item.canonicalTitle != null ? item.canonicalTitle : "No encontrado"}</Text>
                        <Text className="text-white font-semibold absolute bottom-0">Episode: {item.number != null ? item.number : null}</Text>
                    </View>
                </View>
              </ImageBackground>
            ) : 
              <ImageBackground source={require("../../assets/images/error.png")} style={styles.image2} imageStyle={{borderRadius: 24,}}>
                <View 
                    className="flex-col p-2 backdrop-blur-lg bg-transparent/50 rounded-b-3xl h-32 w-32"
                >
                    <View className="h-full">
                        <Text numberOfLines={2} ellipsizeMode="tail" className="text-white font-semibold">{"No disponible"}</Text>
                        <Text className="text-white font-semibold absolute bottom-0"></Text>
                    </View>
                </View>
              </ImageBackground>
          ))}
          />
        </View>
        <View>
          <Text className="text-white font-semibold text-2xl mx-3 my-5">Characters</Text>
          <FlatList 
          horizontal={true}
          data={characters}
          renderItem={({item}) => (
            item == null ? null: (
              item.canonicalName != null ? (
              <ImageBackground source={item.image != null && item.image.original != null ? {uri: item.image.original} : require("../../assets/images/error.png")} style={styles.image2} imageStyle={{borderRadius: 24,}}>
                <View 
                    className="flex-col p-2 backdrop-blur-lg bg-transparent/50 rounded-b-3xl h-32 w-32"
                >
                    <View className="h-full">
                        <Text numberOfLines={2} ellipsizeMode="tail" className="text-white font-semibold">{item.canonicalName != null ? item.canonicalName : "No encontrado"}</Text>
                    </View>
                </View>
              </ImageBackground>
            ) : 
              <ImageBackground source={require("../../assets/images/error.png")} style={styles.image2} imageStyle={{borderRadius: 24,}}>
                <View 
                    className="flex-col p-2 backdrop-blur-lg bg-transparent/50 rounded-b-3xl h-32 w-32"
                >
                    <View className="h-full">
                        <Text numberOfLines={2} ellipsizeMode="tail" className="text-white font-semibold">{"No disponible"}</Text>
                        <Text className="text-white font-semibold absolute bottom-0"></Text>
                    </View>
                </View>
              </ImageBackground>
          ))}
          />
        </View>
      </ScrollView>
    </Screen>
    )
  },
)


const $root: ViewStyle = {
  flex: 1,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
}