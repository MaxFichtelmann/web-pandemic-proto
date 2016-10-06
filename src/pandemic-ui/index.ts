"use strict";

import * as ui from "./canvas/ui"
import { City, CityName, State, Event, MovePlayerEvent, MovePlayer, ChangePlayer, Player, Action, Setup, Tuple } from "./DataTypes"
import * as actionlog from "./actionlog"
import * as Pandemic from "./Pandemic";
import {setup} from './setup';

const players: Player[] = [{
        name: "Max",
        color: "blue",
        city: setup.cities.find(city => city.name === "Leipzig")
    }, {
        name: "Stefan",
        color: "red",
        city: setup.cities.find(city => city.name === "Tennenlohe")
    }]

let currentPlayer = players[0]

for (const city of setup.cities) {
    ui.addCity(city, () => {
        let state: State = {
            cities: setup.cities,
            players,
            currentPlayer: currentPlayer.name
        }
        let event: Event = {
            type: "MovePlayer",
            data: new MovePlayerEvent(currentPlayer.name, city.name)
        }
        let reaction = Pandemic.reactions(setup)(state)(event)
        actionlog.log(reaction)
    })
}

for (const link of setup.links) {
    ui.addLink(link.value0, link.value1)
}

actionlog.subscribe(MovePlayer.TYPE, (action: Action) => {
    let movePlayer: any = action.data.value0;
    let player = players.find(player => player.name === movePlayer.player.name)
    let destination = setup.cities.find(city => city.name === movePlayer.destination.name)
    if (player) {
        player.city = destination
        ui.movePlayer(player, destination)
            .then(() => console.log("moved ", player, " to", destination))
            .then(markReachableCities)
    }
})
actionlog.subscribe(ChangePlayer.TYPE, (action: Action) => {
  let changePlayer: any = action.data.value0;
  let player = players.find(player => player.name === changePlayer.player.name)

  currentPlayer = player
})

for (const player of players) {
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
    var position = currentPlayer.city
    var reachableCities = Pandemic.reachableCities(setup, position)
    ui.setSelectableCities(reachableCities)
}
