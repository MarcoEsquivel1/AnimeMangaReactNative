import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AnimeCharacterModel = types
  .model("AnimeCharacter")
  .props({
    id: types.identifier,
    slug: types.maybeNull(types.string),
    canonicalName: types.maybeNull(types.string),
    image: types.maybeNull(types.model({
      tiny: types.maybeNull(types.string),
      small: types.maybeNull(types.string),
      medium: types.maybeNull(types.string),
      large: types.maybeNull(types.string),
      original: types.maybeNull(types.string),
    })),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AnimeCharacter extends Instance<typeof AnimeCharacterModel> {}
export interface AnimeCharacterSnapshotOut extends SnapshotOut<typeof AnimeCharacterModel> {}
export interface AnimeCharacterSnapshotIn extends SnapshotIn<typeof AnimeCharacterModel> {}
export const createAnimeCharacterDefaultModel = () => types.optional(AnimeCharacterModel, {})
