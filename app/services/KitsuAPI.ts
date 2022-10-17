import axios from 'axios';

export const KitsuAPI = axios.create({
    baseURL: 'https://kitsu.io/api/edge',
    headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }
});

export default class KitsuAPIService {

    static async getAnimeList() {
        const response = await KitsuAPI.get('/trending/anime'); /* ?page%5Blimit%5D=10&page%5Boffset%5D=10 */
        return response.data.data;
    }

    //search anime
    static async searchAnime(query) {
        const response = await KitsuAPI.get(`/anime?filter[text]=${query}`);
        return response.data.data;
    }

    static async getMangaList() {
        const response = await KitsuAPI.get('/trending/manga');
        return response.data.data;
    }

    //anime episodes    
    static async getAnimeEpisodes(animeId) {
        const response = await KitsuAPI.get(`/anime/${animeId}/episodes`);
        return response.data.data;
    }

    //manga chapters
    static async getMangaChapters(mangaId) {
        const response = await KitsuAPI.get(`/manga/${mangaId}/chapters`);
        return response.data.data;
    }

    //anime characters
    static async getAnimeCharacters(animeId) {
        const response = await KitsuAPI.get(`/anime/${animeId}/characters`);
        //get data from each character
        const characters = response.data.data;
        
        const charactersData = characters.map(async (character) => {
            const characterData = await KitsuAPI.get(`/anime-characters/${character.id}/character`);
            return characterData.data.data;
        });
        
        const charactersDataResolved = await Promise.all(charactersData);
        return charactersDataResolved;
    }

    //manga characters
    static async getMangaCharacters(mangaId) {
        const response = await KitsuAPI.get(`/manga/${mangaId}/characters`);
        //get data from each character
        const characters = response.data.data;

        const charactersData = characters.map(async (character) => {
            const characterData = await KitsuAPI.get(`/media-characters/${character.id}/character`);
            return characterData.data.data;
        });

        const charactersDataResolved = await Promise.all(charactersData);
        return charactersDataResolved;
    }


    /* static async getAnimeCharacters(animeId: number) {
        const response = await KitsuAPI.get(`/media-characters/${animeId}/character`);
        return response.data.data;
    } */
}