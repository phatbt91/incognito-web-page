// simulate react native's async-storage
class StorageServices {
  constructor() {
  }

  async setItem(key, value) {
    return localStorage.setItem(key, value);
  }

  async getItem(key) {
    return localStorage.getItem(key);
  }

  async removeItem(key) {
    return localStorage.removeItem(key);
  }
}

export default StorageServices;
