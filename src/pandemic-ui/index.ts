"use strict";

import * as ui from "./canvas/ui"
import { City, CityName, State, Event, MovePlayerEvent, MovePlayer, Player, Action, Setup } from "./DataTypes"
import * as actionlog from "./actionlog"
import * as Pandemic from "./Pandemic";

const cities: Array<City> = [
    {
        name: "Leipzig",
        x: 12,
        y: 10,
    },
    {
        name: "Tennenlohe",
        x: 10,
        y: 14,
    },
    {
        name: "Berlin",
        x: 14,
        y: 6,
    },
    {
        name: "Hamburg",
        x: 9,
        y: 4,
    },
    {
        name: "Essen",
        x: 4,
        y: 9,
    },
    {
        name: "Karlsruhe",
        x: 6,
        y: 15,
    },
    {
        name: "M\u00fcnchen",
        x: 11,
        y: 18,
    }
]

const links: Array<[CityName, CityName]> = [
    ["Leipzig", "Berlin"],
    ["Leipzig", "Tennenlohe"],
    ["Leipzig", "Essen"],
    ["Tennenlohe", "Karlsruhe"],
    ["Tennenlohe", "M\u00fcnchen"],
    ["Berlin", "Hamburg"],
    ["Hamburg", "Essen"],
    ["Essen", "Karlsruhe"],
    ["Karlsruhe", "M\u00fcnchen"]
]

const players: { [name: string]: Player } = {
    max: {
        name: "Max",
        color: "blue",
        city: cities[0]
    }
}

let currentPlayer = players["max"].name

for (const city of cities) {
    ui.addCity(city, () => {
        let setup: Setup = {
            cities,
            links
        }
        let state: State = {
            cities,
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

for (const link of links) {
    ui.addLink(link[0], link[1])
}

actionlog.subscribe(MovePlayer.TYPE, (action: Action) => {
    let movePlayer: any = action.data
    let player = Object.keys(players).map(name => players[name])
        .find(player => player.name === movePlayer.player.name)
    let destination = cities.find(city => city.name === movePlayer.destination.name)
    if (player) {
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
    let setup = {
        cities: cities,
        links: links
    }
    var reachableCities = Pandemic.reachableCities(position)(setup)
    console.log(reachableCities)
}
