import {AXIOS} from '../config';

class PersonService {
  async getActorById(id) {
    const userToken = await localStorage.getItem('token');
    const {data} = await AXIOS.get(`movies/acted_in_by/${id}`, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return data;
  }

  async getDirectionById(id) {
    const userToken = await localStorage.getItem('token');
    const {data} = await AXIOS.get(`movies/directed_by/${id}`, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return data;
  }
}

export const personService = new PersonService();
