import {Player, City} from '../Models'

export const options = {
  scale: 50,
  city: {
    get radius() {
      return options.scale * 4 / 5
    },
    borderSize: 3,
    borderColor: 'black',
    color: 'palegreen'
  },
  player: {
    get radius() {
      return options.scale * 3 / 5
    }
  },
  get gap() {
    return options.city.radius
      + (options.city.borderSize - 1) / 2
      - options.player.radius
  }
}

export function createCity(city: City): fabric.ICircle {
  return new fabric.Circle({
    radius: options.city.radius,
    fill: options.city.color,
    stroke: options.city.borderColor,
    strokeWidth: options.city.borderSize,
    left: city.x * options.scale,
    top: city.y * options.scale,
    selectable: false
  })
}

export function createPlayer(player: Player, city: City): fabric.ICircle {
  return new fabric.Circle({
    radius: options.player.radius,
    fill: player.color,
    selectable: false,
    left: city.x * options.scale + options.gap,
    top: city.y * options.scale + options.gap
  })
}