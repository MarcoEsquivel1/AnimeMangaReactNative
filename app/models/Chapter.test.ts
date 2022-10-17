import { ChapterModel } from "./Chapter"

test("can be created", () => {
  const instance = ChapterModel.create({})

  expect(instance).toBeTruthy()
})
