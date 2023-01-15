
export const searchResolvers = {
  Query: {
    searchSuperHero: (_root, args, { dataSources }) => {
      return dataSources?.superheroApi.searchSuperHero(args.name);
    },

    viewSuperHero: (_root, { id }, { dataSources }) => {
      return dataSources?.superHeroApi.viewSuperHeroDetails(id as Number);
    },
  }
};