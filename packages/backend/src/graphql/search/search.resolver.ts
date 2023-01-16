import { Resolvers } from "../../typings/generated";
import { AuthContext } from "../../middlewares";

export const searchResolvers: Resolvers<AuthContext> = {
 
  Query: {
    searchSuperHero: (_root, { name } , { dataSources }) => {
      return dataSources?.superheroApi.searchSuperHero(name) ;
    },

    viewSuperHeroDetails: (_root, { superheroId }, { dataSources }) => {
      return dataSources?.superheroApi.viewSuperHeroDetails(superheroId as Number);
    },
  },

  Mutation: {
    updateAvatarAndStats: (_root, args, { dataSources }) => {
      return dataSources.superheroApi.updateAvatarAndStats(args.superheroId, args.payload);
    },
    updatePowerStats: (_root, {superheroId, payload}, {dataSources }) => {
      return dataSources.superheroApi.updatePowerStats(superheroId, payload);
    }
  }
};