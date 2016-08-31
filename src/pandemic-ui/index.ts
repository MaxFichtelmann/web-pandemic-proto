"use strict";

import * as ui from './canvas/ui'
import { City, State, Event, MovePlayerEvent, MovePlayer, Player, Action } from './DataTypes';
import * as eventlog from './eventlog';
declare var Pandemic: any;

const cities: { [id: string]: City } = {
    leipzig: {
        name: 'Leipzig',
        x: 12,
        y: 10,
        links: [
            'Berlin',
            'Tennenlohe',
            'Essen'
        ]
    },
    tennenlohe: {
        name: 'Tennenlohe',
        x: 10,
        y: 14,
        links: [
            'Leipzig',
            'M\u00fcnchen',
            'Karlsruhe'
        ]
    },
    berlin: {
        name: 'Berlin',
        x: 14,
        y: 6,
        links: [
            'Hamburg',
            'Leipzig'
        ]
    },
    hamburg: {
        name: 'Hamburg',
        x: 9,
        y: 4,
        links: [
            'Berlin',
            'Essen'
        ]
    },
    essen: {
        name: 'Essen',
        x: 4,
        y: 9,
        links: [
            'Hamburg',
            'Karlsruhe',
            'Leipzig'
        ]
    },
    karlsruhe: {
        name: 'Karlsruhe',
        x: 6,
        y: 15,
        links: [
            'Essen',
            'Tennenlohe',
            'M\u00fcnchen'
        ]
    },
    muenchen: {
        name: 'M\u00fcnchen',
        x: 11,
        y: 18,
        links: [
            'Tennenlohe',
            'Karlsruhe'
        ]
    }
}

const players: {[name: string]: Player} = {
  max: {
      name: 'Max',
      color: 'blue',
      city: cities['leipzig']
  }
}

let currentPlayer = players['max'].name

for (const cityName of Object.keys(cities)) {
    const city = cities[cityName]
    ui.addCity(city, () => {
        let state: State = {
          cities: Object.keys(cities).map(name => cities[name]),
          players: Object.keys(players).map(name => players[name]),
          currentPlayer
        };
        let event: Event = {
          type: 'MovePlayer',
          data: new MovePlayerEvent(currentPlayer, city.name)
        };
        let reaction = Pandemic.reactions(state)(event)
        eventlog.log(reaction)
    });
}

eventlog.subscribe(MovePlayer.TYPE, (action: Action) => {
    let movePlayer: any = action.data
    let player = Object.keys(players).map(name => players[name])
                    .find(player => player.name === movePlayer.player.name)
    let destination = Object.keys(cities).map(name => cities[name])
                    .find(city => city.name === movePlayer.destination.name)
    if (player) {
      ui.movePlayer(player, destination)
        .then(() => console.log('moved ', player, ' to', destination))
    }
})

for (const playerName of Object.keys(players)) {
  const player = players[playerName]
  ui.addPlayer(player, player.city)
}


console.log('created cities')
