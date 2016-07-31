port module Main exposing (..)

import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Debug exposing (..)

port js2elm : (String -> msg) -> Sub msg

port elm2js : String -> Cmd msg

main =
  App.program
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Model = String

init : (Model, Cmd Msg)
init =
  ("", Cmd.none)

type Msg = MsgFromJS String

subscriptions : Model -> Sub Msg
subscriptions model = js2elm MsgFromJS

update : Msg -> Model -> (Model, Cmd Msg)
update (MsgFromJS str) model = ( log "elm" str, Cmd.none )

view : Model -> Html Msg
view model = div [] []
