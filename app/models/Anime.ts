import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import KitsuAPIService from "../services/KitsuAPI"

/**
 * Model description here for TypeScript hints.
 */
export const AnimeModel = types
  .model("Anime")
  .props({
    id: types.identifier,
    slug: types.maybeNull(types.string),
    synopsis: types.maybeNull(types.string),
    canonicalTitle: types.maybeNull(types.string),
    posterImage: types.maybeNull(types.model({
      tiny:  types.maybeNull(types.string),
      small:  types.maybeNull(types.string),
      medium:  types.maybeNull(types.string),
      large:  types.maybeNull(types.string),
      original:  types.maybeNull(types.string),
    })),
    coverImage: types.maybeNull(types.model({
      tiny: types.maybeNull(types.string),
      small: types.maybeNull(types.string),
      large: types.maybeNull(types.string),
      original: types.maybeNull(types.string),
    })),
    youtubeVideoId: types.maybeNull(types.string),
    /* favorite: types.optional(types.boolean, false), */
    /* characters: types.frozen(), */
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /* toggleFavorite() {
      self.favorite = !self.favorite
    }, */
    /* async fetchCharacters() {
      const characters = await KitsuAPIService.getAnimeCharacters(self.id)
    } */
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Anime extends Instance<typeof AnimeModel> {}
export interface AnimeSnapshotOut extends SnapshotOut<typeof AnimeModel> {}
export interface AnimeSnapshotIn extends SnapshotIn<typeof AnimeModel> {}
export const createAnimeDefaultModel = () => types.optional(AnimeModel, {})
