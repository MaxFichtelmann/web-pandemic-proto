declare var Pandemic: any

import { City, State, Setup, Event } from './DataTypes';

export function reactions(setup: Setup) {
    return (state: State) => {
        return (event: Event) => {
            return Pandemic.reactions(setup)(state)(event)
        }
    }
}

export function reachableCities(setup: Setup, position: City) {
    return Pandemic.reachableCities(setup)(position)
}
