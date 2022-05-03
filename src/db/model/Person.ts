enum Level {
    Genin, Chunin, Jonin, Kage
}
enum Status{
    dead, alive,mia, unknown
}
export default interface Person {
    _id: string
    name: string
    villageId: string
    level: Level
    status: Status
    battleforceId: string
}

