"use strict";

const fabric = require('fabric').fabric

const canvas = new fabric.Canvas('canvas')

let currentPlayer;
let towns;

canvas.on('mouse:up', (options) => {
  if (towns.includes(options.target)) {
    const town = options.target
    if (town !== currentPlayer.town) {
      currentPlayer.animate('left',town.left + 11, {
        onChange: () => {
          canvas.renderAll()
          currentPlayer.town = town
        }
      })
    }
  }
})

function createTown(x, y) {
  const town = new fabric.Circle({
    radius: 40,
    fill: undefined,
    stroke: 'black',
    strokeWidth: 3,
    left: x,
    top: y,
    selectable: false
  })

  return town;
}

function createPlayer(color, town) {
  return new fabric.Circle({
    radius: 30,
    fill: color,
    selectable: false,
    left: town.left + 11,
    top: town.top + 11,
    town: town
  })
}

const leipzig = createTown(50,50)
const tennenlohe = createTown(200,50)
const max = createPlayer('blue', leipzig)

towns = [leipzig, tennenlohe]
currentPlayer = max

towns.forEach(town => canvas.add(town))
canvas.add(currentPlayer)
