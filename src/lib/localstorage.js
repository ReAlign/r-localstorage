import _ from './_';
import Config from './config';

class LocalStorage {
    constructor() {
        this.support = _.support();
        this.storage = this.support ? window.localStorage : null;
    }

    /**
   * @name  存数据方法
   * @param {string}              key                         存储关键字
   * @param {any}                 value                       存储数据
   * @param {object}              opt                         配置项
   *      @param {string}         opt.cover                   是否覆盖
   *      @param {string}         opt.expiry                  有效期【支持：时间戳 | 时长描述】
   *          @param {timestamp}  timestamp                   有效截止时间点
   *          @param {string}     `xxx+(ms|s|m|h|d|w|mo|y)`   存活时长
   */
    set(key = '', value = '', opt = {}) {
        if (key && this.support) {
            const {
                cover = false, // 覆盖
                expiry = '' // 有效期
            } = opt;
            let expirySign = '';

            // 存在有效期
            if (expiry) {
                const _type = _.typeOf(expiry);
                // 是时间戳
                if (_type === 'number' && expiry >= 0) {
                    expirySign = `${Config.prefix.point}${expiry}`;
                }
                // 是效期范围
                else if (
                    _type === 'string' &&
          Config.getFormatExpiryRange(expiry).length === 2
                ) {
                    const _exp = Config.getFormatExpiryRange(expiry).join(
                        Config.numUnitSeparator
                    );
                    expirySign = `${Config.prefix.range}${_exp}`;
                }
                // 错误
                else {
                    _.formatConsole({
                        con: 'expiry format error!!!'
                    });
                    console.error(_.errText);
                    return null;
                }
            }

            const checkVal = this.get(key);

            // 不覆盖
            if (!cover && checkVal !== null && checkVal !== false) {
                const conStrArr = [
                    `data \`${key}\` already existed.`,
                    'if you want to cover the original data, please use: set(key, value, { ..., cover: true })'
                ];

                _.formatConsole({
                    con: _.makeConsoleStr(conStrArr)
                });
                console.error(_.errText);
                return false;
            }
            const vObj = {
                t: +Date.now(),
                v: value,
                e: expirySign
            };
            this.storage.setItem(key, JSON.stringify(vObj));

            const obj = {};
            obj.key = key;
            obj.value = this.get(key);

            return obj;
        }

        return false;
    }
    get(key = '') {
        if (key && this.support) {
            // 是否需要清除-效期
            let clearFlag = false;
            // 获取到的已存在的数据
            const obj = _.jsonParse(this.storage.getItem(key));

            if (obj === null) {
                return null;
            }

            // 存储时间
            const _timeSaved = obj.t || 0;
            // 效期
            const _expiry = obj.e || '';

            // 存在效期
            if (_expiry) {
                const _now = new Date().getTime();

                // 明确时间点模式
                if (_expiry.indexOf(Config.prefix.point) === 0) {
                    // 目前 > 有效时间点
                    clearFlag = _now > Number(_expiry.substr(2));
                } else if (_expiry.indexOf(Config.prefix.range) === 0) {
                    // 效期范围
                    const _rangeTimestamp = Config.makeTimestampByFormatedExpiryRange(
                        _expiry.substr(2).split(Config.numUnitSeparator)
                    );
                    // 已存在时长 = 目前时间 - 存储时时间
                    const _existedTimestamp = _now - _timeSaved;
                    // 已存在时长 > 效期范围
                    clearFlag = _existedTimestamp > _rangeTimestamp;
                }
            }

            // 过期
            if (clearFlag) {
                const _flag = this.remove(key);

                if (_flag) {
                    // _.formatConsole({ con: `过期数据清理成功!`, type: 'normal' });
                }

                return null;
            }

            return Config.$trans(obj);
        }
        return false;
    }
    has(key = '') {
        if (key && this.support) {
            return this.get(key) !== null;
        }
        return false;
    }
    remove(key = '') {
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
                const _val = this.get(k);
                if (_val) {
                    res[k] = _val;
                }
            }

            return res;
        }
        return false;
    }
    getSurplusCapacityKb() {
        if (this.support) {
            const usedCapacity = JSON.stringify(this.storage).length;
            const surplus = (Config.LSMaxCapacity - usedCapacity) / Config.KB;
            return surplus;
        }
        return false;
    }
}

export default LocalStorage;
