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
    powerStats: PowerStats
    biography: Biography
    appearance: Appearance
    work: Work
    connections: Connections
    image: Image!
  }

  type SuperHeroSearch {
   results: [SuperHero]
  }

  input AvatarAndStatsInput {
    powerStats: PowerStats!
    image: Upload!
  }

  type Query {
    searchSuperHero(name: String!): SuperHeroSearch!
    viewSuperHeroDetails(id: Int!): SuperHero!
  }

  type Mutation {
    updatePowerStats(id: Int!, payload: PowerStats!): SuperHero!
    updateAvatarAndStats(id: Int!, payload: AvatarAndStatsInput!): SuperHero!
  }
`;