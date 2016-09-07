declare var Pandemic: any

import {State, Setup, Event} from './DataTypes';

export function reactions(setup: Setup) {
  return (state: State) => {
    return (event: Event) => {
      return Pandemic.reactions(setup)(state)(event)
    }
  }
}
