import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import KitsuAPIService from "../services/KitsuAPI"

/**
 * Model description here for TypeScript hints.
 */
export const AnimeModel = types
  .model("Anime")
  .props({
    id: types.string,
    slug: types.string,
    synopsis: types.string,
    canonicalTitle: types.string,
    posterImage: types.model({
      tiny: types.string,
      small: types.string,
      medium: types.string,
      large: types.string,
      original: types.string,
    }),/* 
    coverImage: types.model({
      tiny: types.string,
      small: types.string,
      large: types.string,
      original: types.string,
    }), */
    youtubeVideoId: types.string,
    /* characters: types.frozen(), */
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /* async fetchCharacters() {
      const characters = await KitsuAPIService.getAnimeCharacters(self.id)
    } */
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Anime extends Instance<typeof AnimeModel> {}
export interface AnimeSnapshotOut extends SnapshotOut<typeof AnimeModel> {}
export interface AnimeSnapshotIn extends SnapshotIn<typeof AnimeModel> {}
export const createAnimeDefaultModel = () => types.optional(AnimeModel, {})
