import {AXIOS} from "../config";

class GenresService {
    async getAllGenres () {
        const { data } = await AXIOS.get('/genres');
        return data;
    }
}

export const genresService = new GenresService();
