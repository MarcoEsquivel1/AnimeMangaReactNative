import { AnimeModel } from "./Anime"

test("can be created", () => {
  const instance = AnimeModel.create({})

  expect(instance).toBeTruthy()
})
