import {Player, City, DiseaseIndicator} from '../DataTypes';

export type CityShape = fabric.IGroup

export const options = {
  scale: 25,
  city: {
    get radius() {
      return options.scale * 2 / 5
    },
    get borderSize() {
      return options.scale / 20
    },
    borderColor: 'black',
    color: 'palegreen'
  },
  player: {
    get radius() {
      return options.scale * 3 / 10
    }
  },
  diseaseIndicator: {
    get width() {
      return options.city.radius
    },
    get height() {
      return options.diseaseIndicator.width / 2
    },
    borderColor: 'black'
  },
  get gap() {
    return options.city.radius
      + (options.city.borderSize - 1) / 2
      - options.player.radius
  }
}

export function createCity(city: City): CityShape {
  const circle = new fabric.Circle({
    radius: options.city.radius,
    fill: options.city.color,
    stroke: options.city.borderColor,
    strokeWidth: options.city.borderSize,
    originX: 'right',
    originY: 'bottom'
  })

  const text = new fabric.Text(city.name, {
    originY: 'center',
    left: options.gap,
    fontFamily: 'sans',
    fontSize: options.city.radius,
    fontWeight: "bold"
  })

  return new fabric.Group([circle, text], {
    left: city.x * options.scale,
    top: city.y * options.scale,
    selectable: false
  })
}

export function setDiseaseIndicators(city: CityShape, indicators: Array<DiseaseIndicator>): void {
  const objects = city.getObjects()
  const text = objects[1]
  objects.slice(2)
    .forEach(group => city.remove(group))

  let lastGroup
  for (const indicator of indicators) {
    let lastIndicatorShape: fabric.IRect
    const shapes: Array<fabric.IRect> = []
    for (let i=0; i< indicator.count; i++) {
      const indicatorShape = new fabric.Rect({
        originY: "center",
        top: text.top,
        width: options.diseaseIndicator.width,
        height: options.diseaseIndicator.height,
        fill: indicator.color,
        stroke: options.diseaseIndicator.borderColor
      })
      if (lastIndicatorShape) {
        indicatorShape.top = lastIndicatorShape.top - indicatorShape.height - options.gap
      }
      shapes.push(indicatorShape)
      lastIndicatorShape = indicatorShape
    }
    let left
    if (lastGroup) {
      left = lastGroup.left + lastGroup.width + options.gap
    } else {
      left = text.left + text.width + options.gap * 2
    }

    const group = new fabric.Group(shapes, {
      originY: "center",
      left: left
    })
    city.add(group)
    lastGroup = group
  }
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

export function createLink(source: CityShape, target: CityShape): fabric.IObject {
  return new fabric.Line([
    source.left + options.city.radius,
    source.top + options.city.radius,
    target.left + options.city.radius,
    target.top + options.city.radius
  ], {
    stroke: 'lightgrey',
    selectable: false
  })
}
