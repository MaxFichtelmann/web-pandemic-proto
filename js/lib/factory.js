const fabric = require('fabric').fabric

const SCALE = 50;

const options = {
  town: {
    radius: SCALE * 4/5,
    borderSize: 3,
    borderColor: 'black',
    color: 'palegreen'
  },
  player: {
    radius: SCALE * 3/5
  }
}

const GAP = options.town.radius
            + (options.town.borderSize - 1) / 2
            - options.player.radius
options.gap = GAP;

module.exports = {
  options: options,
  createTown: (x, y) => {
    return new fabric.Circle({
      radius: options.town.radius,
      fill: options.town.color,
      stroke: options.town.borderColor,
      strokeWidth: options.town.borderSize,
      left: x * SCALE,
      top: y * SCALE,
      selectable: false
    })
  },

  createPlayer: (color, town) => {
    return new fabric.Circle({
      radius: options.player.radius,
      fill: color,
      selectable: false,
      left: town.left + GAP,
      top: town.top + GAP
    })
  }
}
