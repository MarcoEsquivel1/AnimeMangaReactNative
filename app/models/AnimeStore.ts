import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import KitsuAPIService from "../services/KitsuAPI"
import { mapAnime } from "../utils/delay"
import { Anime, AnimeModel } from "./Anime"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const AnimeStoreModel = types
  .model("AnimeStore")
  .props({
    animeList: types.array(AnimeModel),
    isLoading: types.optional(types.boolean, false),
    favorites: types.array(types.reference(AnimeModel)),
    favoritesOnly: false,
  })
  .views((self) => ({
    get animes(){
      return self.favoritesOnly ? self.favorites : self.animeList
    },
    hasFavorite(anime: Anime) {
      return self.favorites.includes(anime)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchAnimes() {
      const animes = await KitsuAPIService.getAnimeList()
      self.setProp("animeList", animes.map(mapAnime))
    },
    addFavorite(anime: Anime) {
      self.favorites.push(anime)
    },
    removeFavorite(anime: Anime) {
      self.favorites.remove(anime)
    },
  })) 
  .actions((self) => ({
    toggleFavorite(anime: Anime) {
      if (self.hasFavorite(anime)) {
        self.removeFavorite(anime)
      } else {
        self.addFavorite(anime)
      }
    },
  }))// eslint-disable-line @typescript-eslint/no-unused-vars

export interface AnimeStore extends Instance<typeof AnimeStoreModel> {}
export interface AnimeStoreSnapshotOut extends SnapshotOut<typeof AnimeStoreModel> {}
export interface AnimeStoreSnapshotIn extends SnapshotIn<typeof AnimeStoreModel> {}
export const createAnimeStoreDefaultModel = () => types.optional(AnimeStoreModel, {})
