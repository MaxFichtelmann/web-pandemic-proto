import { City, Player, CityName, PlayerName, DiseaseIndicator } from "../DataTypes";
import { createCity, createPlayer, createLink, options, CityShape, setDiseaseIndicators } from "./factory"

class UiCity {
    shape: CityShape
    name: CityName
    onClick: () => void
}

class UiPlayer {
    shape: fabric.IObject
    name: PlayerName
}

const cities: Array<UiCity> = []
const players: Array<UiPlayer> = []

const canvas = new fabric.Canvas("canvas")

export function addCity(city: City, onClick: () => void): Promise<City> {
    return new Promise((resolve, reject) => {
        const shape = createCity(city)
        cities.push({
            shape,
            onClick,
            name: city.name
        })

        shape.on("mouseup", onClick)

        canvas.add(shape)

        resolve(city)
    })
}

export function setDiseaseIndicatorsFor(cityName: CityName, indicators: Array<DiseaseIndicator>): Promise<{}> {
  return new Promise((resolve, reject) => {
    const city = cities.find(c => c.name === cityName)
    setDiseaseIndicators(city.shape, indicators)
    canvas.renderAll()
    resolve()
  })
}

export function addLink(cityName1: CityName, cityName2: CityName): Promise<{}> {
    return new Promise((resolve, reject) => {
        const city1 = cities.find(c => c.name === cityName1)
        const city2 = cities.find(c => c.name === cityName2)

        const link = createLink(city1.shape, city2.shape)
        canvas.add(link)
        link.sendToBack()

        resolve()
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
            "left": cityShape.left + options.gap,
            "top": cityShape.top + options.gap
        }, {
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                    resolve()
                }
            }
        )
    })
}
