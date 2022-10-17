import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { navigate } from "../navigators"
/**
 * Model description here for TypeScript hints.
 */
export const MangaModel = types
  .model("Manga")
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
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    navigate() {
      navigate("Manga", { manga: self })
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Manga extends Instance<typeof MangaModel> {}
export interface MangaSnapshotOut extends SnapshotOut<typeof MangaModel> {}
export interface MangaSnapshotIn extends SnapshotIn<typeof MangaModel> {}
export const createMangaDefaultModel = () => types.optional(MangaModel, {})
