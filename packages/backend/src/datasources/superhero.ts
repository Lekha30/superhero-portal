import { RESTDataSource } from '@apollo/datasource-rest';
import { API_URL, FB_ACCESS_TOKEM } from '../config';
import { SuperHero } from 'src/typings/generated';

interface SuperHeroResponse {
  response: string;
  results: SuperHero;
}

export default class SuperHeroApi extends RESTDataSource {

  baseURL: string;
  token: string;
  constructor() {
    super();
    this.baseURL = API_URL;
    this.token = FB_ACCESS_TOKEM;
  }


  //TODO:  Fix typings
  async searchSuperHero ( name : string): Promise<SuperHero[]> {

    const path = `${this.baseURL}/${this.token}/search/${name}`;
    console.log('path:', path);
    const matchedSuperHeros = await this.get<SuperHeroResponse>(path);
    console.log(matchedSuperHeros);
    // //@ts-ignore
    if(!Array.isArray(matchedSuperHeros?.results)) {
      return [] as SuperHero[];
    }
    //@ts-ignore
    return  matchedSuperHeros?.results?.map(superhero => superhero) as any[];
  }

  async viewSuperHeroDetails(id: Number): Promise<any> {
    const path = `${this.baseURL}/${this.token}/${id}`;
    const mySuperHeroDetails = await this.get(path);
    return mySuperHeroDetails;

  }

  async updatePowerStats(id: Number, payload: any): Promise<any> {
    try {
      // Assuming there is a path called powerstats
      const res = await this.patch(`${this.baseURL}/${this.token}/api/${id}/powerstats`, payload);
      // Query superhero details and then return it back
      return res;
    } catch (error) {
      console.error('Error updating powerstats');
    }

  }

  // To be implemented
  // @ts-ignore
  async updateAvatarAndStats(id: Number, payload: any): Promise<any> {
    // Call the power stats method
    // update avatar separately
  }
}