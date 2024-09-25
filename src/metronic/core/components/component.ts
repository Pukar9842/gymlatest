/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

declare global {
  interface Window {
    GlobalComponentsConfig: object;
  }
}

import Data from '../helpers/data';
import Dom from '../helpers/dom';
import Utils from '../helpers/utils';
import GlobalComponentsConfig from './config';
import {BreakpointType, OptionType} from '../types';

export default class Component {
  protected _name: string;
  protected _defaultConfig: object;
  protected _config: object;
  protected _events: Map<string, Map<string, CallableFunction>>;
  protected _uid: string | null = null;
  protected _element: HTMLElement | null = null;

  protected _init(element: HTMLElement | null) {
    element = Dom.getElement(element);

    if (!element) {
      return;
    }

    this._element = element;
    this._events = new Map();
    this._uid = Utils.geUID(this._name);

    Data.set(this._element, this._name, this);
  }

  protected _fireEvent(eventType: string, payload: object = null): void {
    this._events.get(eventType)?.forEach((callable) => {
      callable(payload);
    });
  }

  protected _dispatchEvent(eventType: string, payload: object = null): void {
    const event = new CustomEvent(eventType, {
      detail: { payload },
      bubbles: true,
      cancelable: true,
      composed: false,
    });

    if (!this._element) return;
    this._element.dispatchEvent(event);
  }

  protected _getOption(name: string): OptionType {
    const value = this._config[name as keyof object];

    if (value && (typeof value) === 'string') {
      return this._getResponsiveOption(value);
    } else {
      return value;
    }
  }

  protected _getResponsiveOption(value: string): OptionType {
    let result = null;
    const width = Dom.getViewPort().width;
    const parts = String(value).split('|');

    if (parts.length > 1) {
      for (let i = parts.length - 1; i < parts.length; i--) {
        const part = parts[i];

        if (part.includes(':')) {
          const [breakpointKey, breakpointValue] = part.split(':');    
          const breakpoint = Utils.getBreakpoint(breakpointKey as BreakpointType);
          if (breakpoint <= width) {
            result = breakpointValue;
            break;
          }
        } else {
          result = part;
          break;
        }
      }
    } else {
      result = value;
    }

    result = Utils.parseDataAttribute(result);

    return result;
  }

  protected _getGlobalConfig(): object {
    if (window.GlobalComponentsConfig && (window.GlobalComponentsConfig as object)[this._name as keyof object]) {
      return (window.GlobalComponentsConfig as object)[this._name as keyof object] as object;
    } else if (GlobalComponentsConfig && (GlobalComponentsConfig as object)[this._name as keyof object]) {
      return (GlobalComponentsConfig as object)[this._name as keyof object] as object;
    } else {
      return {};
    }
  }

  protected _buildConfig(config: object = {}): void {
    if (!this._element) return;

    this._config = {
      ...this._defaultConfig,
      ...this._getGlobalConfig(),
      ...Dom.getDataAttributes(this._element, this._name),
      ...config,
    };
  }

  public dispose(): void {
    if (!this._element) return;
    Data.remove(this._element, this._name);
  }

  public on(eventType: string, callback: CallableFunction): string {
    const eventId = Utils.geUID();

    if (!this._events.get(eventType)) {
      this._events.set(eventType, new Map());
    }

    this._events.get(eventType).set(eventId, callback);

    return eventId;
  }

  public off(eventType: string, eventId: string): void {
    this._events.get(eventType)?.delete(eventId);
  }

  public getOption(name: string): OptionType {
    return this._getOption(name as keyof object);
  }

  public getElement(): HTMLElement {
    if (!this._element) return null;
    return this._element;
  }
}
