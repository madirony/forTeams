class LocalStorage {
  static setItem(key, item) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, item);
    }
  }

  static getItem(key) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
  }

  static removeItem(key) {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }
}

export default LocalStorage;
