module Pandemic where

newtype CityName = CityName String
type City = { name :: CityName }
type State = { playerPosition :: City }
data Event = ClickCity City
data Reaction = MovePlayer City

reactions :: State -> Event -> Array Reaction
reactions state (ClickCity city) = if (isReachable city state.playerPosition)
                                   then [ (MovePlayer city) ]
                                   else []
  where isReachable city position = true  -- dummy impl
