import {Action} from './DataTypes';

const actions: Array<Action> = []

export type SubscriptionId = number

let nextId: SubscriptionId = 0;

const subscriptions: {[id: number]: (action: Action) => void } = {}
const subscribers: {[type: string]: Array<number>} = {}

function actOn(action: Action) {
  let subs = subscribers[action.type]
  if (subs) {
    subs.map(id => subscriptions[id])
        .forEach(act => act && act(action))
  }
}

export function log(actions: Array<Action>): void {
  actions.forEach(action => {
    actions.push(action)
    actOn(action)
  })
}

export function subscribe(type: string, callback: (action: Action) => void): SubscriptionId {
  let id = nextId++
  let subs = subscribers[type] = subscribers[type] || []
  subs.push(id)

  subscriptions[id] = callback
  return id
}

export function unsubscribe(id: SubscriptionId): void {
  delete subscriptions[id]
}
