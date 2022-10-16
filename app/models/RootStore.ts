import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AnimeStoreModel } from "./AnimeStore"
import { MangaStoreModel } from "./MangaStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    animeStore: types.optional(AnimeStoreModel, {} as any),
    mangaStore: types.optional(MangaStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
