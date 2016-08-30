module Pandemic where

newtype CityName = CityName String
newtype PlayerName = PlayerName String
type City = {
  name  :: CityName,
  links :: Array CityName
}

type Player = {
  name :: PlayerName,
  city :: City
}

type State = {
  map :: Array City,
  players :: Array Player,
  currentPlayer :: Player
}

type Message = {
  event :: Event,
  state :: State
}

-- inbound event types
type MovePlayerEvent = {
  player       :: PlayerName,
  destination  :: CityName
}

type Event = {
  type :: String,
  data :: MovePlayerEvent
}

-- outbound action types
type MovePlayer = {
  player      :: Player,
  destination :: City
}

type Action = {
  type :: String,
  data :: MovePlayer
}

data Reaction = MovePlayer City

processEvent :: State -> Event -> Action
processEvent state event = {
    type: "MovePlayer",
    data: {
      player: state.currentPlayer,
-- TODO set destination as the city with the name from the action
      destination: event.data.destination
    }
  }

reactions :: Message -> Action
reactions message = processEvent message.state message.event
