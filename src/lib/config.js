import _ from './_';

const Config = {};

// 数字与单位的分隔符
Config.numUnitSeparator = '_';
// 前缀 map
Config.prefix = {
    point: 'p-',
    range: 'r-'
};
// kb 和 最大容量
Config.KB = 1024;
Config.LSMaxCapacity = Config.KB * Config.KB * 5;

// 转换变量 map
Config.transMap = {
    t: 'createTime',
    v: 'value'
};
// 转换：转换(过滤())
Config.$trans = (obj = {}) =>
    _.transKey(_.collectByKey(obj, Config.transMap), Config.transMap);

// 时间单位对象
Config.unit = {
    // map 表
    maps: {
        ms: 1,
        s: 1000,
        m: 1000 * 60,
        h: 1000 * 60 * 60,
        d: 1000 * 60 * 60 * 24,
        w: 1000 * 60 * 60 * 24 * 7,
        mo: 1000 * 60 * 60 * 24 * 30,
        y: 1000 * 60 * 60 * 24 * 30 * 12
    }
};
// 时间单位枚举
Config.unit.enumArr = Object.keys(Config.unit.maps);
// 获取格式化之后的效期值
Config.getFormatExpiryRange = (str = '') => {
    const res = [];
    const patt = new RegExp(`^([0-9]+)(${Config.unit.enumArr.join('|')})$`);

    const arr = str.match(patt) || [];

    if (arr.length === 3) {
        res[0] = arr[1];
        res[1] = arr[2];
    }

    return res;
};
// 根据格式化之后的效期值 转化成 时间戳
Config.makeTimestampByFormatedExpiryRange = (arr = []) => {
    if (_.typeOf(arr) === 'array' && arr.length === 2) {
        return Number(arr[0]) * (Config.unit.maps[arr[1]] || 0);
    }

    return 0;
};

export default Config;
