import {Message, Action} from './DataTypes';

declare module Pandemic {
  export function react(message: Message): Action
}
