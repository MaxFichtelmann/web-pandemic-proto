module Test.Main where

import Prelude
import Data.Tuple (Tuple(..))
import Pandemic (City(..), CityName(..), reachableCities, isReachable)
import Test.QuickCheck (assertEquals, quickCheck', QC)

cityA :: City
cityA = City { name: (CityName "A") }
cityB :: City
cityB = City { name: (CityName "B") }

testCities :: Array City
testCities = [ cityA, cityB, City { name: (CityName "C") } ]

testLinks :: Array (Tuple CityName CityName)
testLinks = [ Tuple (CityName "A") (CityName "B") ]

main :: forall eff. QC eff Unit
main = do
  quickCheck' 1 $ assertEquals true $ isReachable testLinks cityA cityB
  quickCheck' 1 $ assertEquals [ cityB ] $ reachableCities { cities: testCities, links: testLinks } cityA
  quickCheck' 1 $ assertEquals [ cityA ] $ reachableCities { cities: testCities, links: testLinks } cityB
