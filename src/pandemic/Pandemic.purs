module Pandemic where

import Prelude ((==), class Eq)
import Data.Foldable (find, class Foldable)
import Data.Maybe (fromJust)
import Data.Tuple
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

type Setup = {
  cities :: Array City,
  links :: Array (Tuple CityName CityName)
}

type State = {
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

reactions :: Setup -> State -> Event -> Action
reactions setup state event = {
    type: "MovePlayer",
    data: {
      player: unsafeFind (\p -> state.currentPlayer == p.name) state.players,
      destination: unsafeFind (\city -> city.name == event.data.destination) setup.cities
    }
  }

unsafeFind :: forall a f. Foldable f => (a -> Boolean) -> f a -> a
unsafeFind pred foldable = unsafePartial (fromJust (find pred foldable))

reachableCities :: City -> Setup -> Array City
reachableCities position { cities, links } = []
