import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import KitsuAPIService from "../services/KitsuAPI"
import { navigate } from "../navigators"
import { EpisodeModel } from "./Episode"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { AnimeCharacterModel } from "./AnimeCharacter"
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
    episodes: types.maybeNull(types.array(EpisodeModel)), 
    characters: types.maybeNull(types.array(AnimeCharacterModel)),
    /* favorite: types.optional(types.boolean, false), */
    /* characters: types.frozen(), */
  })
  .views((self) => ({
    get characterList(){
      return self.characters || []
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    navigate() {
      navigate("Anime", { anime: self })
    },
    //episodes
    async fetchEpisodes() {
      const episodes = await KitsuAPIService.getAnimeEpisodes(self.id);
      self.setProp("episodes", episodes.map((episode) => ({
        id: episode.id,
        number: episode.attributes.number,
        canonicalTitle: episode.attributes.canonicalTitle,
        synopsis: episode.attributes.synopsis,
        thumbnail: episode.attributes.thumbnail,
      })));
    },
    //characters
    async fetchCharacters() {
      const characters = await KitsuAPIService.getAnimeCharacters(self.id);
      self.setProp("characters", characters.map((character) => ({
        id: character.id,
        slug: character.attributes.slug,
        canonicalName: character.attributes.canonicalName,
        image: character.attributes.image,
      })));
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Anime extends Instance<typeof AnimeModel> {}
export interface AnimeSnapshotOut extends SnapshotOut<typeof AnimeModel> {}
export interface AnimeSnapshotIn extends SnapshotIn<typeof AnimeModel> {}
export const createAnimeDefaultModel = () => types.optional(AnimeModel, {})
