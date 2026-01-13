type OptionsType = {
  prefix?: string;
  expired?: number; //number:相对时间
};

class LocalStore<T extends Record<string, any>> {
  private options;
  constructor(options?: OptionsType) {
    this.options = options;
  }

  getItemKey(key: keyof T): string {
    const { prefix } = this.options || {};
    //TODO 为什么key会是symbol类型
    return prefix ? `${prefix}-${String(key)}` : String(key);
  }

  set<Key extends keyof T>(key: Key, value: T[Key]): void {
    const itemKey = this.getItemKey(key);
    localStorage.setItem(itemKey, JSON.stringify(value));
  }
  get<Key extends keyof T>(key: Key): T[Key] | undefined {
    const itemKey = this.getItemKey(key);
    const cache = localStorage.getItem(itemKey);
    if (!cache) return void 0;
    try {
      return JSON.parse(cache);
    } catch (e) {
      return cache as T[Key];
    }
  }
  clear() {
    localStorage.clear();
  }
  removeItem(key: keyof T) {
    const itemKey = this.getItemKey(key);
    localStorage.removeItem(itemKey);
  }
  key(num: number): any {
    return localStorage.key(num);
  }

  get length(): number {
    return localStorage.length;
  }
}

export default LocalStore;
