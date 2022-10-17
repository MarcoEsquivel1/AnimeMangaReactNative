import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AnimeCharacterModel = types
  .model("AnimeCharacter")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AnimeCharacter extends Instance<typeof AnimeCharacterModel> {}
export interface AnimeCharacterSnapshotOut extends SnapshotOut<typeof AnimeCharacterModel> {}
export interface AnimeCharacterSnapshotIn extends SnapshotIn<typeof AnimeCharacterModel> {}
export const createAnimeCharacterDefaultModel = () => types.optional(AnimeCharacterModel, {})
