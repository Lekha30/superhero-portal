import { Resolvers } from "../../typings/generated";
import { AuthContext } from "../../middlewares";

export const searchResolvers: Resolvers<AuthContext> = {

  Query: {
    searchSuperHero: (_root, { name } , { dataSources }) => {
      console.log('name in resolver:', name);
      return dataSources?.superheroApi.searchSuperHero(name) ;
    },

    viewSuperHeroDetails: (_root, { id }, { dataSources }) => {
      return dataSources?.superheroApi.viewSuperHeroDetails(id as Number);
    },
  },

  Mutation: {
    updateAvatarAndStats: (_root, args, { dataSources }) => {
      return dataSources.superheroApi.updateAvatarAndStats(args.id, args.payload);
    },
    updatePowerStats: (_root, {id, payload}, {dataSources }) => {
      return dataSources.superheroApi.updatePowerStats(id, payload);
    }
  }
};