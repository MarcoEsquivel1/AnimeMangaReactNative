import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import KitsuAPIService from "../services/KitsuAPI"
import { mapManga } from "../utils/delay"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Manga, MangaModel } from "./Manga"

/**
 * Model description here for TypeScript hints.
 */
export const MangaStoreModel = types
  .model("MangaStore")
  .props({
    mangas: types.array(MangaModel),
    isLoading: types.optional(types.boolean, false),
    favorites: types.array(types.reference(MangaModel)),
    favoritesOnly: false,
  })
  .views((self) => ({
    get mangaList(){
      return self.favoritesOnly ? self.favorites : self.mangas
    },
    hasFavorite(manga: Manga) {
      return self.favorites.includes(manga)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchMangas() {
      const mangas = await KitsuAPIService.getMangaList()
      self.setProp("mangas", mangas.map(mapManga))
    },
    addFavorite(manga: Manga) {
      self.favorites.push(manga)
    },
    removeFavorite(manga: Manga) {
      self.favorites.remove(manga)
    },
  })) 
  .actions((self) => ({
    toggleFavorite(manga: Manga) {
      if (self.hasFavorite(manga)) {
        self.removeFavorite(manga)
      } else {
        self.addFavorite(manga)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface MangaStore extends Instance<typeof MangaStoreModel> {}
export interface MangaStoreSnapshotOut extends SnapshotOut<typeof MangaStoreModel> {}
export interface MangaStoreSnapshotIn extends SnapshotIn<typeof MangaStoreModel> {}
export const createMangaStoreDefaultModel = () => types.optional(MangaStoreModel, {})
