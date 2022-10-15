import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import KitsuAPIService from "../services/KitsuAPI"
import { mapAnime } from "../utils/delay"
import { AnimeModel } from "./Anime"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const AnimeStoreModel = types
  .model("AnimeStore")
  .props({
    animeList: types.array(AnimeModel),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchAnimes() {
      const animes = await KitsuAPIService.getAnimeList()
      self.setProp("animeList", animes.map(mapAnime))
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AnimeStore extends Instance<typeof AnimeStoreModel> {}
export interface AnimeStoreSnapshotOut extends SnapshotOut<typeof AnimeStoreModel> {}
export interface AnimeStoreSnapshotIn extends SnapshotIn<typeof AnimeStoreModel> {}
export const createAnimeStoreDefaultModel = () => types.optional(AnimeStoreModel, {})
