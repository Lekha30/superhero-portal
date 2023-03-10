import { gql } from 'apollo-server-express';

export const searchTypeDefs = gql`
  enum Gender {
    Male
    Female
    Unknown
  }

  type PowerStats {
    intelligence: Int
    strength: Int
    speed: Int
    durability: Int
    power: Int
    combat: Int
  }
 
  type Biography {
    fullName: String
    alterEgos: String
    aliases: [String]
    placeOfBirth: String
    firstAppearance: String
    publisher: String
    alignment: String
  }

  type Appearance {
    gender: Gender
    race: String
    height: [String]
    weight: [String]
    eyeColor: String
    hairColor: String

  }

  type Work {
    occupation: String
    base: String
  }

  type Connections {
    groupAffiliation: String
    relatives: String
  }

  type Image {
     url: String!
  }

  type SuperHero {
    id: Int!
    name: String!
    powerstats: PowerStats
    biography: Biography
    appearance: Appearance
    work: Work
    connections: Connections
    image: Image!
  }

  type SuperHeroTruncated {
    id: Int!
    name: String!
    powerstats: PowerStats
    image: Image
  }

  type SuperHeroSearch {
   results: [SuperHero]
  }
  input PowerStatsInput {
    intelligence: Int
    strength: Int
    speed: Int
    durability: Int
    power: Int
    combat: Int
  }

  input AvatarAndStatsInput {
    powerStats: PowerStatsInput!
    image: Upload!
  }

  type Query {
    searchSuperHero(name: String!): [SuperHero!]
    viewSuperHeroDetails(superheroId: Int!): SuperHero!
  }

  type Mutation {
    updatePowerStats(superheroId: Int!, payload: PowerStatsInput!): SuperHeroTruncated!
    updateAvatarAndStats(superheroId: Int!, payload: AvatarAndStatsInput!): SuperHeroTruncated!
  }
`;