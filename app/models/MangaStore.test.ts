import { MangaStoreModel } from "./MangaStore"

test("can be created", () => {
  const instance = MangaStoreModel.create({})

  expect(instance).toBeTruthy()
})
