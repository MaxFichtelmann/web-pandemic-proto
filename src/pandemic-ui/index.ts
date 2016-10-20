"use strict";

import * as ui from "./canvas/ui"
import { City, CityName, State, Event, MovePlayerEvent, MovePlayer, ChangePlayer, Player, PlayerName, Action, Setup, Tuple } from "./DataTypes"
import * as actionlog from "./actionlog"
import * as Pandemic from "./Pandemic";
import { setup } from './setup';


let currentPlayer: Player = setup.players[0]
let playerLocations: Map<string, string> = new Map().set("Max", "Leipzig").set("Stefan", "Tennenlohe");

for (const city of setup.cities) {
    ui.addCity(city, () => {
        let state: State = {
            cities: setup.cities,
            currentPlayer: currentPlayer.name,
            playerLocations: Array.from(playerLocations, ([key, val]) => new Tuple(key, val))
        }
        let event: Event = {
            type: "MovePlayer",
            data: new MovePlayerEvent(currentPlayer.name, city.name)
        }
        let reactions = Pandemic.reactions(setup, state, event)
        actionlog.log(reactions)
    })
}

for (const link of setup.links) {
    ui.addLink(link.value0, link.value1)
}

actionlog.subscribe(MovePlayer.TYPE, (action: Action) => {
    let movePlayer: any = action.data.value0;
    let player = setup.players.find(player => player.name === movePlayer.player.name)
    let destination = setup.cities.find(city => city.name === movePlayer.destination.name)
    if (player) {
        playerLocations.set(player.name, destination.name)
        ui.movePlayer(player, destination)
            .then(() => console.log("moved ", player, " to", destination))
            .then(markReachableCities)
    }
})
actionlog.subscribe(ChangePlayer.TYPE, (action: Action) => {
    let changePlayer: any = action.data.value0;
    let player = setup.players.find(player => player.name === changePlayer.player.name)

    currentPlayer = player
})

for (const player of setup.players) {
    ui.addPlayer(player, findCurrentCityForPlayer(player.name))
}

ui.setDiseaseIndicatorsFor("Essen", [{
    color: "red",
    count: 3
}, {
    color: "blue",
    count: 2
}])
ui.setDiseaseIndicatorsFor("Essen", [{
    color: "red",
    count: 1
}, {
    color: "blue",
    count: 1
}])

markReachableCities()

function markReachableCities() {
    let position = findCurrentCityForPlayer(currentPlayer.name)
    let reachableCities = Pandemic.reachableCities(setup, position)
    ui.setSelectableCities(reachableCities)
}

function findCurrentCityForPlayer(playerName): City {
  let playerLocation: CityName = playerLocations.get(playerName)
  return setup.cities.find(c => c.name == playerLocation)
}
