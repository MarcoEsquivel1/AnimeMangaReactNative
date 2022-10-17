import { AnimeCharacterModel } from "./AnimeCharacter"

test("can be created", () => {
  const instance = AnimeCharacterModel.create({})

  expect(instance).toBeTruthy()
})
