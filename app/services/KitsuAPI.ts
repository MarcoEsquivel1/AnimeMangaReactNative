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
        const response = await KitsuAPI.get('/anime');
        return response.data.data;
    }

    /* static async getAnimeCharacters(animeId: number) {
        const response = await KitsuAPI.get(`/media-characters/${animeId}/character`);
        return response.data.data;
    } */
}