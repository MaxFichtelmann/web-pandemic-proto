"use strict";

import * as ui from "./canvas/ui"
import { City, CityName, State, Event, MovePlayerEvent, MovePlayer, Player, Action, Setup, Tuple } from "./DataTypes"
import * as actionlog from "./actionlog"
import * as Pandemic from "./Pandemic";
import {setup} from './setup';

const players: { [name: string]: Player } = {
    max: {
        name: "Max",
        color: "blue",
        city: setup.cities[0]
    }
}

let currentPlayer = players["max"].name

for (const city of setup.cities) {
    ui.addCity(city, () => {
        let state: State = {
            cities: setup.cities,
            players: Object.keys(players).map(name => players[name]),
            currentPlayer
        }
        let event: Event = {
            type: "MovePlayer",
            data: new MovePlayerEvent(currentPlayer, city.name)
        }
        let reaction = Pandemic.reactions(setup)(state)(event)
        actionlog.log(reaction)
    })
}

for (const link of setup.links) {
    ui.addLink(link.value0, link.value1)
}

actionlog.subscribe(MovePlayer.TYPE, (action: Action) => {
    let movePlayer: any = action.data
    let player = Object.keys(players).map(name => players[name])
        .find(player => player.name === movePlayer.player.name)
    let destination = setup.cities.find(city => city.name === movePlayer.destination.name)
    if (player) {
        player.city = destination
        ui.movePlayer(player, destination)
            .then(() => console.log("moved ", player, " to", destination))
            .then(markReachableCities)
    }
})

for (const playerName of Object.keys(players)) {
    const player = players[playerName]
    ui.addPlayer(player, player.city)
}

ui.setDiseaseIndicatorsFor("Essen", [{
  color: "red",
  count: 3
}, {
  color: "blue",
  count: 2
}])

markReachableCities()

function markReachableCities() {
    var position = players["max"].city
    var reachableCities = Pandemic.reachableCities(setup, position)
    ui.setSelectableCities(reachableCities)
}
