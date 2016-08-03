"use strict";

const fabric = require('fabric').fabric
const canvas = new fabric.Canvas('canvas')
const factory = require('./lib/factory')
const elm = Elm.Main.worker()

const towns = {}
const players = {}

canvas.on('mouse:up', (options) => {
  if(options.target) {
    elm.ports.click.send(options.target.id)
  }
})

elm.ports.townCreate.subscribe(function(tuple) {
  var [name, x, y] = tuple;
  const town = factory.createTown(x, y)
  town.id = name
  town.type = 'town'
  canvas.add(town)
  towns[name] = town
})

elm.ports.playerCreate.subscribe(function(tuple) {
  var [name, color, startTown] = tuple;
  const player = factory.createPlayer(color, towns[startTown])
  player.id = name
  player.type = 'player'
  canvas.add(player)
  players[name] = player
})

elm.ports.playerMove.subscribe(function(tuple) {
  var [playerName, townName] = tuple;
  const town = towns[townName]
  players[playerName].animate({
    'left': town.left + factory.options.gap,
    'top': town.top + factory.options.gap
  }, {
    onChange: canvas.renderAll.bind(canvas),
    onComplete: () => {
//      elm.ports.js2elm.send(["player:moved", playerName, townName])
    }
  })
})

// logic to be moved to elm below

// fakeElm.subscribe('click', (type, id) => {
//   if (type === 'town' ) {
//     const town = towns[id]
//     if (id !== elmModel.players[currentPlayer].town) {
//       fakeElm.emit('player:move', currentPlayer, id)
//     }
//   }
// })
//
// fakeElm.subscribe('player:moved', (playerName, townName) => {
//   elmModel.players[playerName].town = townName
//   console.log(`moved ${playerName} to ${townName}`)
// })
