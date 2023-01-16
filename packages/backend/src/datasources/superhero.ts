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
    const matchedSuperHeros = await this.get<SuperHeroResponse>(path);
    // //@ts-ignore
    if(!Array.isArray(matchedSuperHeros?.results)) {
      return [] as SuperHero[];
    }
    return  matchedSuperHeros?.results?.map((superhero: SuperHero) => {
      return {
        id: superhero.id,
        name: superhero.name,
        powerstats: {
          combat: superhero.powerstats?.combat,
          durability: superhero.powerstats?.durability,
          intelligence: superhero.powerstats?.intelligence,
          power: superhero.powerstats?.power,
          speed: superhero.powerstats?.speed,
          strength: superhero.powerstats?.strength,
        },
        image: {
          url: superhero.image.url
        }
      };
    });
  }

  async viewSuperHeroDetails(superheroId: Number): Promise<any> {
    const path = `${this.baseURL}/${this.token}/${superheroId}`;
    const mySuperHeroDetails = await this.get(path);
    return {
      id: mySuperHeroDetails.id,
      name: mySuperHeroDetails.name,
      powerstats: {
        combat: mySuperHeroDetails.powerstats?.combat,
        durability: mySuperHeroDetails.powerstats?.durability,
        intelligence: mySuperHeroDetails.powerstats?.intelligence,
        power: mySuperHeroDetails.powerstats?.power,
        speed: mySuperHeroDetails.powerstats?.speed,
        strength: mySuperHeroDetails.powerstats?.strength,
      },
      biography: {
        fullName: mySuperHeroDetails.biography.fullName,
        alterEgos: mySuperHeroDetails.biography.alterEgos,
        aliases: mySuperHeroDetails.biography.aliases?.map(alias => alias),
        placOfBirth: mySuperHeroDetails.biography.placeOfBirth,
        firstAppearance: mySuperHeroDetails.biography.firstAppearance,
        publisher: mySuperHeroDetails.biography.publisher,
        alignment: mySuperHeroDetails.biography.alignment,
      },
      appearance: {
        gender: mySuperHeroDetails.appearance?.gender,
        race: mySuperHeroDetails.appearance?.race,
        height: mySuperHeroDetails.appearance?.height.map(h => h),
        weight: mySuperHeroDetails.appearance?.weight.map(w => w),
        eyeColor: mySuperHeroDetails.appearance?.eyeColor,
        hairColor: mySuperHeroDetails.appearance?.hairColor,
        
      },
      work: {
        occupation: mySuperHeroDetails.work?.occupation,
        base: mySuperHeroDetails.work?.base,
      },
      connections: {
        groupAffiliation: mySuperHeroDetails.connections?.groupAffiliation,
        relatives: mySuperHeroDetails.connections?.relatives
      },
      image: {
        url: mySuperHeroDetails.image.url
      }
    };

  }

  async updatePowerStats(superheroId: Number, payload: any): Promise<any> {
    try {
      // Assuming there is a path called powerstats
      const res = await this.patch(`${this.baseURL}/${this.token}/api/${superheroId}/powerstats`, payload);
      // Query superhero details and then return it back
      return res;
    } catch (error) {
      console.error('Error updating powerstats');
    }

  }

  // To be implemented
  // @ts-ignore
  async updateAvatarAndStats(superheroId: Number, payload: any): Promise<any> {
    // Call the power stats method
    // update avatar separately
  }
}