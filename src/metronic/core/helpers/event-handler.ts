import { CallableType } from '../types';
import Utils from './utils';

export interface DelegatedEventHandlersInterface {
  [key: string]: CallableType;
}

const DelegatedEventHandlers: DelegatedEventHandlersInterface = {};

const EventHandler = {
  on: function(element: HTMLElement, selector: string, eventName: string, handler: CallableType): string {
    if ( element === null ) {
      return null;
    }

    const eventId = Utils.geUID('event');

    DelegatedEventHandlers[eventId] = (event: Event & {target: HTMLElement}) => {
      const targets = element.querySelectorAll(selector);
      let target = event.target;

      while (target && target !== element) {
        for (let i = 0, j = targets.length; i < j; i++ ) {
          if (target === targets[i] ) {
            handler.call(this, event, target);
          }
        }

        target = target.parentNode as HTMLElement;
      }
    };

    element.addEventListener(eventName, DelegatedEventHandlers[eventId]);

    return eventId;
  },

  off(element: HTMLElement, eventName: string, eventId: string) {
    if (!element || DelegatedEventHandlers[eventId] === null) {
      return;
    }

    element.removeEventListener(eventName, DelegatedEventHandlers[eventId]);

    delete DelegatedEventHandlers[eventId];
  }
};

export default EventHandler;
