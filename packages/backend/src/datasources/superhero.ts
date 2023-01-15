import { RESTDataSource } from '@apollo/datasource-rest';
import { API_URL, FB_ACCESS_TOKEM } from 'src/config';

export default class SuperHeroApi extends RESTDataSource {

  baseURL: string;
  token: string;
  constructor() {
    super();
    this.baseURL = API_URL;
    this.token = FB_ACCESS_TOKEM;
  }


  async searchSuperHero (name: String): Promise<any> {

    const path = `${this.token}/search/${name}`;
    const matchedSuperHeros = await this.get(path);
    if(!Array.isArray(matchedSuperHeros)) {
      return [];
    }
    // @ts-ignore
    return matchedSuperHeros?.results?.map((superHero) => superHero) as any;
  }

  async viewSuperHeroDetails(id: Number): Promise<any> {
    const path = `${this.token}/${id}`;
    const mySuperHeroDetails = await this.get(path);
    return mySuperHeroDetails;

  }

  async updatePowerStats(payload: any): Promise<any> {
    try {
      // Assuming there is a path called powerstats
      const res = await this.put('/api/powerstats', payload);
      // Query superhero details and then return it back
      return res;
    } catch (error) {
      console.error('Error updating powerstats');
    }

  }

  // To be implemented
  // @ts-ignore
  async updateAvatarAndStats(payload: any): Promise<any> {
    // Call the power stats method
    // update avatar separately
  }
}