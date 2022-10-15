/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mapAnime = (anime: any) => ({
    id: anime.id,
    slug: anime.attributes.slug,
    synopsis: anime.attributes.synopsis,
    titles: anime.attributes.titles,
    canonicalTitle: anime.attributes.canonicalTitle,
    posterImage: anime.attributes.posterImage,
    /* coverImage: anime.attributes.coverImage, */
    youtubeVideoId: anime.attributes.youtubeVideoId,
})