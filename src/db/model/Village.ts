import Person from "./Person";

export default interface Village {
    _id: string
    name: string
    kage: Person
    population: number
    battleforcesIds: string[]
}
