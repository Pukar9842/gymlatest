const ElementMap = new Map();

const Data = {
  set(element: HTMLElement, key: string, value: unknown): void {
    if (!ElementMap.has(element)) {
      ElementMap.set(element, new Map());
    }

    const valueMap = ElementMap.get(element);

    valueMap.set(key, value);
  },

  get(element: HTMLElement, key: string): unknown {
    if (ElementMap.has(element)) {
      return ElementMap.get(element).get(key) || null;
    }

    return null;
  },

  has(element: HTMLElement, key: string): boolean {
    return ElementMap.has(element) && ElementMap.get(element).has(key);
  },

  remove(element: HTMLElement, key: string): void {
    if (!ElementMap.has(element) || !ElementMap.get(element).has(key)) {
      return;
    }

    const valueMap = ElementMap.get(element);

    valueMap.delete(key);

    if (valueMap.size === 0) {
      ElementMap.delete(element);
    }
  }
};

export default Data;
