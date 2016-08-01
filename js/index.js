"use strict";

const fabric = require('fabric').fabric
const canvas = new fabric.Canvas('canvas')
const factory = require('./lib/factory')
const elm = Elm.Main.worker()

const fakeElm = {
  channels: {},
  subscribe: function(channel, callback) {
    this.channels[channel] = callback
  },
  emit: function(channel, ...data) {
    this.channels[channel](...data)
  }
}

const towns = {}
const players = {}

canvas.on('mouse:up', (options) => {
  if(options.target) {
    fakeElm.emit('click', options.target.type, options.target.id)
  }
})

fakeElm.subscribe('town:create', (name, x, y) => {
  const town = factory.createTown(x, y)
  town.id = name
  town.type = 'town'
  canvas.add(town)
  towns[name] = town
})

fakeElm.subscribe('player:create', (name, color, startTown) => {
  const player = factory.createPlayer(color, towns[startTown])
  player.id = name
  player.type = 'player'
  canvas.add(player)
  players[name] = player
})

fakeElm.subscribe('player:move', (playerName, townName) => {
  const town = towns[townName]
  players[playerName].animate({
    'left': town.left + factory.options.gap,
    'top': town.top + factory.options.gap
  }, {
    onChange: canvas.renderAll.bind(canvas),
    onComplete: () => {
      fakeElm.emit('player:moved', playerName, townName)
    }
  })
})

// logic to be moved to elm below

let currentPlayer = 'max';
const elmModel = {
  towns: {
    leipzig: {
      x:1, y:1
    },
    tennenlohe: {
      x:4, y:2
    }
  },
  players: {
    max: {
      color: 'blue',
      town: 'leipzig'
    }
  }
}

Object.keys(elmModel.towns).forEach(function(name) {
  const town = elmModel.towns[name]
  fakeElm.emit('town:create', name, town.x, town.y)
});

Object.keys(elmModel.players).forEach(function(name) {
  const player = elmModel.players[name]
  fakeElm.emit('player:create', name, player.color, player.town)
});

fakeElm.subscribe('click', (type, id) => {
  if (type === 'town' ) {
    const town = towns[id]
    if (id !== elmModel.players[currentPlayer].town) {
      fakeElm.emit('player:move', currentPlayer, id)
    }
  }
})

fakeElm.subscribe('player:moved', (playerName, townName) => {
  elmModel.players[playerName].town = townName
  console.log(`moved ${playerName} to ${townName}`)
})
