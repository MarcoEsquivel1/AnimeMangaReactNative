import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const MangaModel = types
  .model("Manga")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Manga extends Instance<typeof MangaModel> {}
export interface MangaSnapshotOut extends SnapshotOut<typeof MangaModel> {}
export interface MangaSnapshotIn extends SnapshotIn<typeof MangaModel> {}
export const createMangaDefaultModel = () => types.optional(MangaModel, {})
