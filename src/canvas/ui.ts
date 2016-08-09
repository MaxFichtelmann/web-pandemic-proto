import {City, Player} from '../Models'
import {createCity, createPlayer, options} from './factory'
import * as EventEmitter from 'wolfy87-eventemitter'

const cities = {}
const players = {}

const canvas = new fabric.Canvas('canvas')

export const events = new EventEmitter()

canvas.on('mouse:up', (options) => {
    if (options.target) {
        const city = Object.keys(cities).find(
            name => cities[name] === options.target
        )
        if (city) {
            events.emitEvent('click:city', [city])
        }
    }
})

export function addCity(city: City): Promise<City> {
    return new Promise((resolve, reject) => {
        const item = createCity(city)
        console.log('created', item)
        cities[city.name] = item

        canvas.add(item)
        resolve(city)
    })
}

export function addPlayer(player: Player, city: City): Promise<Player> {
    return new Promise((resolve, reject) => {
        const item = createPlayer(player, city)
        players[player.name] = item

        canvas.add(item)
        resolve(player)
    })
}

export function movePlayer(playerName: string, cityName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const city = cities[cityName]
        const player = players[playerName]

        player.animate({
            'left': city.left + options.gap,
            'top': city.top + options.gap
        }, {
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                    resolve(cityName)
                }
            }
        )
    })
}