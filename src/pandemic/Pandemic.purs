module Pandemic where

import Prelude ((==), class Eq)
import Data.Maybe (fromJust)
import Data.Foldable (find, class Foldable)
import Partial.Unsafe (unsafePartial)

newtype CityName = CityName String
instance eqCityName :: Eq CityName where
  eq (CityName a) (CityName b) = a == b

newtype PlayerName = PlayerName String
instance eqPlayerName :: Eq PlayerName where
  eq (PlayerName a) (PlayerName b) = a == b

type City = {
  name  :: CityName,
  links :: Array CityName
}

type Player = {
  name :: PlayerName,
  city :: CityName
}

type State = {
  cities :: Array City,
  players :: Array Player,
  currentPlayer :: PlayerName
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
type MovePlayerAction = {
  player      :: Player,
  destination :: City
}

type Action = {
  type :: String,
  data :: MovePlayerAction
}

reactions :: State -> Event -> Action
reactions state event = {
    type: "MovePlayer",
    data: {
      player: unsafeFind (\p -> state.currentPlayer == p.name) state.players,
      destination: unsafeFind (\city -> city.name == event.data.destination) state.cities
    }
  }

unsafeFind :: forall a f. Foldable f => (a -> Boolean) -> f a -> a
unsafeFind pred foldable = unsafePartial (fromJust (find pred foldable))
