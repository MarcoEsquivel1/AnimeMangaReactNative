import { AnimeStoreModel } from "./AnimeStore"

test("can be created", () => {
  const instance = AnimeStoreModel.create({})

  expect(instance).toBeTruthy()
})
