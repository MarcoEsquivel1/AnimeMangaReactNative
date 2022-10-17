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

    static async getMangaList() {
        const response = await KitsuAPI.get('/trending/manga');
        return response.data.data;
    }

    /* static async getAnimeCharacters(animeId: number) {
        const response = await KitsuAPI.get(`/media-characters/${animeId}/character`);
        return response.data.data;
    } */
}