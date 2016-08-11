import {Player, City} from '../Models'

export const options = {
  scale: 25,
  city: {
    get radius() {
      return options.scale * 2 / 5
    },
    borderSize: 1,
    borderColor: 'black',
    color: 'palegreen'
  },
  player: {
    get radius() {
      return options.scale * 3 / 10
    }
  },
  get gap() {
    return options.city.radius
      + (options.city.borderSize - 1) / 2
      - options.player.radius
  }
}

export function createCity(city: City): fabric.IObject {
  const circle = new fabric.Circle({
    radius: options.city.radius,
    fill: options.city.color,
    stroke: options.city.borderColor,
    strokeWidth: options.city.borderSize,
    originX: 'right',
    originY: 'bottom'
  })

  const text = new fabric.Text(city.name, {
    originX: 'left',
    originY: 'center',
    fontFamily: 'sans',
    fontSize: 10
  })

  return new fabric.Group([circle, text], {
    left: city.x * options.scale,
    top: city.y * options.scale,
    selectable: false
  })
}

export function createPlayer(player: Player, city: City): fabric.IObject {
  return new fabric.Circle({
    radius: options.player.radius,
    fill: player.color,
    selectable: false,
    left: city.x * options.scale + options.gap,
    top: city.y * options.scale + options.gap
  })
}