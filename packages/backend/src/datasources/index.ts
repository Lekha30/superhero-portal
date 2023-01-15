import SuperHeroApi from './superhero';


export interface DataSources {
  superheroApi: SuperHeroApi;
}

export default () => {
  return {
    superheroApi: new SuperHeroApi(),
  };
};
