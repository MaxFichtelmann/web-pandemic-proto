import { City, Player, CityName, PlayerName, DiseaseIndicator } from "../DataTypes";
import * as shapes from "./shapes"

class UiCity {
    shape: shapes.CityShape
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
        const shape = shapes.createCity(city)
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

export function setSelectableCities(selectableCities: Array<City>): Promise<{}> {
  return new Promise((resolve, reject) => {
    for (const city of cities) {
      if (selectableCities.find(sCity => sCity.name === city.name)) {
        city.shape.hoverCursor = "pointer"
        city.shape.getObjects()[0].fill = shapes.options.city.color
      } else {
        city.shape.hoverCursor = "default"
        city.shape.getObjects()[0].fill = "lightgrey"
      }
      canvas.renderAll()
    }
  })
}

export function setDiseaseIndicatorsFor(cityName: CityName, indicators: Array<DiseaseIndicator>): Promise<{}> {
  return new Promise((resolve, reject) => {
    const city = cities.find(c => c.name === cityName)
    shapes.setDiseaseIndicators(city.shape, indicators)
    canvas.renderAll()
    resolve()
  })
}

export function addLink(cityName1: CityName, cityName2: CityName): Promise<{}> {
    return new Promise((resolve, reject) => {
        const city1 = cities.find(c => c.name === cityName1)
        const city2 = cities.find(c => c.name === cityName2)

        const link = shapes.createLink(city1.shape, city2.shape)
        canvas.add(link)
        link.sendToBack()

        resolve()
    })
}

export function addPlayer(player: Player, city: City): Promise<{}> {
    return new Promise((resolve, reject) => {
        const shape = shapes.createPlayer(player, city)
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
            "left": cityShape.left + shapes.options.gap,
            "top": cityShape.top + shapes.options.gap
        }, {
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                    resolve()
                }
            }
        )
    })
}
