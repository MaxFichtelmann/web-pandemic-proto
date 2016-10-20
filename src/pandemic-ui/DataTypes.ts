export type CityName = string
export type PlayerName = string
export type EventType = string

export class Setup {
  players: Array<Player>
  cities: Array<City>
  links: Array<Tuple<CityName, CityName>>
}

export class City {
    name: CityName
    x: number
    y: number
}

export class Player {
    name: PlayerName
    color: string
}

export class DiseaseIndicator {
  color: string
  count: number
}

export interface EventData {}

export class MovePlayerEvent implements EventData {
  player: PlayerName
  destination: CityName
  constructor(player: PlayerName, destination: CityName) {
    this.player = player
    this.destination = destination
  }
}

export class Event {
  type: EventType
  data: EventData
}

export class State {
  cities: Array<City>
  currentPlayer: PlayerName
  playerLocations: Array<Tuple<PlayerName, CityName>>
}

export class Message {
  event: Event
  state: State
}

export class Action {
  type: string
  data: TaggedActionData
}

export interface TaggedActionData {
  value0: ActionData
}

export interface ActionData {}

export class MovePlayer implements ActionData {
  static get TYPE(): string { return 'MovePlayer' }
  type: string = MovePlayer.TYPE
  player: PlayerName
  destination: CityName
}

export class ChangePlayer implements ActionData {
  static get TYPE(): string { return 'ChangePlayer' }
  type: string = ChangePlayer.TYPE
  player: PlayerName
}

export class Tuple<T,V> {
  value0: T
  value1: V
  constructor(value0: T, value1: V) {
    this.value0 = value0
    this.value1 = value1
  }

  static create<T,V>(value0: T): (value1: V) => Tuple<T,V> {
    return (value1: V) => {
      return new Tuple(value0, value1)
    }
  }
}
