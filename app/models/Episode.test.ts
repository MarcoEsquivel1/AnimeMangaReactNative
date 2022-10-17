import { EpisodeModel } from "./Episode"

test("can be created", () => {
  const instance = EpisodeModel.create({})

  expect(instance).toBeTruthy()
})
