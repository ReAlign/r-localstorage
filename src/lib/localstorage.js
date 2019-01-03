import _ from "./_";
import Trans from "./trans";

class LocalStorage {
  constructor() {
    this.support = _.support();
    this.storage = this.support ? window.localStorage : null;
  }
  set(key = "", value = "", opt = {}) {
    if (key && this.support) {
      const {
        cover = false // 覆盖
      } = opt;
      const checkVal = this.get(key);

      // 不覆盖
      if (!cover && checkVal !== null && checkVal !== false) {
        const conStrArr = [
          `data ${key} already existed.`,
          "if you want to cover the original data, please use: ",
          "set(key, value, { cover: true })"
        ];

        console.error(_.makeConsoleStr(conStrArr));
        return false;
      }
      const vObj = {
        t: +Date.now(),
        v: value
      };
      this.storage.setItem(key, JSON.stringify(vObj));

      const obj = {};
      obj.key = key;
      obj.value = Trans.$trans(this.get(key));

      return obj;
    }

    return false;
  }
  get(key = "") {
    if (key && this.support) {
      const obj = _.jsonParse(this.storage.getItem(key));
      return Trans.$trans(obj);
    }
    return false;
  }
  has(key = "") {
    if (key && this.support) {
      return this.get(key) !== null;
    }
    return false;
  }
  remove(key = "") {
    if (key && this.support) {
      this.storage.removeItem(key);
      return !this.get(key);
    }
    return false;
  }
  clear() {
    if (this.support) {
      this.storage.clear();
      return !this.storage.length;
    }
    return false;
  }
  getKeyList() {
    if (this.support) {
      const list = [];

      for (let i = 0; i < this.storage.length; i++) {
        list.push(this.storage.key(i));
      }

      return list;
    }
    return false;
  }
  getAll() {
    if (this.support) {
      const allKeys = this.getKeyList();
      const res = {};
      for (const k of allKeys) {
        res[k] = Trans.$trans(this.get(k));
      }

      return res;
    }
    return false;
  }
  getSurplusCapacityKb() {
    if (this.support) {
      const maxCapacity = 1024 * 1024 * 5;
      const usedCapacity = JSON.stringify(this.storage).length;
      const surplus = (maxCapacity - usedCapacity) / 1024;
      return surplus;
    }
    return false;
  }
}

export default LocalStorage;
