import SuperHeroApi from './superhero';


export interface DataSources {
  superheroApi: SuperHeroApi;
}

export const initializedDS = () => {
  return {
    superheroApi: new SuperHeroApi(),
  };
};
