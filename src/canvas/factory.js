const fabric = require('fabric').fabric

const options = {
  town: {
    radius: 40,
    borderSize: 3,
    borderColor: 'black',
    color: 'palegreen'
  },
  player: {
    radius: 30
  }
}

module.exports = {
  options: options,
  createTown: (x, y) => {
    return new fabric.Circle({
      radius: options.town.radius,
      fill: options.town.color,
      stroke: options.town.borderColor,
      strokeWidth: options.town.borderSize,
      left: x,
      top: y,
      selectable: false
    })
  },

  createPlayer: (color, town) => {
    return new fabric.Circle({
      radius: 30,
      fill: color,
      selectable: false,
      left: town.left + 11,
      top: town.top + 11,
      town: town
    })
  }
}
