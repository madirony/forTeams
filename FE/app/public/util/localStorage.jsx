class LocalStorage {
  static setItem(key, item) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, item);
      // console.log("[LocalStorage] setItem 성공");
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

  static clear() {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  }
}

export default LocalStorage;
