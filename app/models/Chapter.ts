import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ChapterModel = types
  .model("Chapter")
  .props({
    id: types.identifier,
    number: types.maybeNull(types.number),
    canonicalTitle: types.maybeNull(types.string),
    synopsis: types.maybeNull(types.string),
    thumbnail: types.maybeNull(types.model({
      tiny: types.maybeNull(types.string),
      small: types.maybeNull(types.string),
      large: types.maybeNull(types.string),
      original: types.maybeNull(types.string),
    })),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Chapter extends Instance<typeof ChapterModel> {}
export interface ChapterSnapshotOut extends SnapshotOut<typeof ChapterModel> {}
export interface ChapterSnapshotIn extends SnapshotIn<typeof ChapterModel> {}
export const createChapterDefaultModel = () => types.optional(ChapterModel, {})
