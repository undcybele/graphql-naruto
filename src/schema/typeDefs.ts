export const typeDefs = `
  type Village {
    _id: ID!
    name: String!
    kage: Person
    population: Int
    battleforce: Battleforce
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
    level: Level
    status: Status
 }

 type Battleforce {
     _id: ID!
    nrOfPeople: Int
    listOfPeople: [Person]
 }

 input PersonInput {
    person: Person!
  }

  type Query {
    getAllVillages: [Village]!
    getVillageById: Village!
    getPersonById: Person!
    getPeopleByLevel: [Person]!
  }

  type Mutation {
    addPerson(input: PersonInput): Person
    changePersonStatus(id: ID!): Person
    changePersonLevel(id: ID!): Person
  }
`;
