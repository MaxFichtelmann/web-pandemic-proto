export type CityName = string
export type PlayerName = string
export type EventType = string

export class City {
    name: CityName
    x: number
    y: number
    links: Array<CityName>
}

export class Player {
    name: PlayerName
    color: string
    city: City
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
  map: Array<City>
  players: Array<Player>
  currentPlayer: Player
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
