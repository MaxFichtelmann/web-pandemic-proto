"use strict";

import * as ui from './canvas/ui'

const cities = {
    leipzig: {
        name: 'Leipzig',
        x: 1,
        y: 1
    },
    tennenlohe: {
        name: 'Tennenlohe',
        x: 4,
        y: 2
    },
    atlanta: {
        name: 'Atlanta',
        x: 2,
        y: 5
    }
}

for (const cityName of Object.keys(cities)) {
    ui.addCity(cities[cityName]);
}

ui.addPlayer({
    name: 'Max',
    color: 'blue'
}, cities.leipzig)

ui.events.on('click:city', city => {
    ui.movePlayer('Max', city)
        .then(() => console.log('moved player to', city))
})

console.log('created cities')