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
    animes: types.array(AnimeModel),
    isLoading: types.optional(types.boolean, false),
    favorites: types.array(types.reference(AnimeModel)),
    favoritesOnly: false,
    searchedAnime: types.optional(types.array(AnimeModel), []),
  })
  .views((self) => ({
    get animeList(){
      return self.favoritesOnly ? self.favorites : self.animes
    },
    hasFavorite(anime: Anime) {
      return self.favorites.includes(anime)
    },
    get searchedAnimeList() {
      return self.searchedAnime
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchAnimes() {
      const animes = await KitsuAPIService.getAnimeList()
      self.setProp("animes", animes.map(mapAnime))
    },
    addFavorite(anime: Anime) {
      self.favorites.push(anime)
    },
    removeFavorite(anime: Anime) {
      self.favorites.remove(anime)
    },
    async searchAnime(query: string) {
      const animes = await KitsuAPIService.searchAnime(query)
      self.setProp("searchedAnime", animes.map(mapAnime))
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
