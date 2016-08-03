port module Main exposing (..)

import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Debug exposing (..)

port click : (String -> msg) -> Sub msg

port townCreate : (String, Int, Int) -> Cmd msg
port playerCreate : (String, String, String) -> Cmd msg
port playerMove : (String, String) -> Cmd msg

main =
  App.program
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Model = { towns: List Town
                   , player: Player
                   }

type alias Town = { name : String
                  , x : Int
                  , y : Int
                  }

type alias Player = { name : String
                    , color : String
                    , townName : String
                    }

init : (Model, Cmd Msg)
init = ({ towns = [ { name = "leipzig", x = 1, y = 1 }
                  , { name = "tennenlohe", x = 4, y = 2 }
                  ]
        , player = { name = "max", color = "blue", townName = "leipzig" }
        }, Cmd.batch [ townCreate ("leipzig", 1, 1), townCreate ("tennenlohe", 4, 2), playerCreate ("max", "blue", "leipzig")])

type Msg = Click String

subscriptions : Model -> Sub Msg
subscriptions model = click Click

update : Msg -> Model -> (Model, Cmd Msg)
update (Click targetTown) model = let currentPlayer = model.player
                                      updatedPlayer = { currentPlayer | townName = targetTown }
                                  in  ( { model | player = updatedPlayer }, playerMove ("max", targetTown))

view : Model -> Html Msg
view model = div [] []
