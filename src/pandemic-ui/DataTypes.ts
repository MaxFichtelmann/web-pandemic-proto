export type CityName = string
export type PlayerName = string
export type EventType = string

export class Setup {
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
    city: City
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
  players: Array<Player>
  currentPlayer: PlayerName
}

export class Message {
  event: Event
  state: State
}

export class Action {
  type: string
  data: ActionData
}

export interface ActionData {}

export class MovePlayer implements ActionData {
  static get TYPE(): string { return 'MovePlayer' }
  type: string = MovePlayer.TYPE
  player: PlayerName
  destination: CityName
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
