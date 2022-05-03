export const typeDefs = `
  type Village {
    _id: ID!
    name: String!
    kage: Person!
    population: Int!
    battleforces: [Battleforce]!
  }

  enum Level {
      Genin, Chunin, Jonin, Kage
  }
  enum Status {
      dead, alive, mia, unknown
  }

 type Person {
     _id: ID!
     name: String!
     village: Village!
    level: Level
    status: Status
    battleforce: BattleForce
 }

 type Battleforce {
     _id: ID!
     villageId: ID!
    nrOfPeople: Int!
    listOfPeople: [Person]!
 }

 input PersonInput {
    person: Person!
  }

  type Query {
    getAllVillages: [Village]!
    getVillageById(id: ID!): Village!
    getPersonById(id: ID!): Person!
    getPeopleByLevel(): [Person]!
  }

  type Mutation {
    addPerson(input: PersonInput): Person
    changePersonStatus(id: ID!): Person
    changePersonLevel(id: ID!): Person
  }
`;
