import { MangaModel } from "./Manga"

test("can be created", () => {
  const instance = MangaModel.create({})

  expect(instance).toBeTruthy()
})
