import {City, Player, CityName, PlayerName} from '../Models'
import {createCity, createPlayer, options} from './factory'

class UiCity {
    shape: fabric.IObject
    name: CityName
    onClick: () => void
}

class UiPlayer {
    shape: fabric.IObject
    name: PlayerName
}

const cities: Array<UiCity> = []
const players: Array<UiPlayer> = []

const canvas = new fabric.Canvas('canvas')

export function addCity(city: City, onClick: () => void): Promise<City> {
    return new Promise((resolve, reject) => {
        const shape = createCity(city)
        cities.push({
            shape,
            onClick,
            name: city.name    
        })

        shape.on('mouseup', onClick)

        canvas.add(shape)
        resolve(city)
    })
}

export function addPlayer(player: Player, city: City): Promise<{}> {
    return new Promise((resolve, reject) => {
        const shape = createPlayer(player, city)
        players.push({
            shape,
            name: player.name
        })
        players[player.name] = shape

        canvas.add(shape)
        resolve()
    })
}

export function movePlayer(player: Player, city: City): Promise<{}> {
    return new Promise((resolve, reject) => {
        const cityShape = cities.find(c => c.name === city.name).shape
        const playerShape = players.find(p => p.name === player.name).shape

        playerShape.animate({
            'left': cityShape.left + options.gap,
            'top': cityShape.top + options.gap
        }, {
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                    resolve()
                }
            }
        )
    })
}