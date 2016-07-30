"use strict";

const fabric = require('fabric').fabric
const canvas = new fabric.Canvas('canvas')
const factory = require('./lib/factory')
const elm = Elm.Experiment.worker();

let currentPlayer;
let towns;

const gap = factory.options.town.radius
            + (factory.options.town.borderSize - 1) / 2
            - factory.options.player.radius

console.log(gap)
canvas.on('mouse:up', (options) => {
  if (towns.includes(options.target)) {
    const town = options.target
    if (town !== currentPlayer.town) {
      currentPlayer.animate({
        'left': town.left + gap,
        'top': town.top + gap
      }, {
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
          currentPlayer.town = town
          elm.ports.js2elm.send("123")
        }
      })
    }
  }
})

const leipzig = factory.createTown(50,50)
const tennenlohe = factory.createTown(200,100)
const max = factory.createPlayer('blue', leipzig)

towns = [leipzig, tennenlohe]
currentPlayer = max

towns.forEach(town => canvas.add(town))
canvas.add(currentPlayer)
