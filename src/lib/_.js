const _ = {};

// 类型
_.typeOf = o =>
  o === null
    ? String(o)
    : {}.toString
        .call(o)
        .slice(8, -1)
        .toLowerCase();
_.support = () => {
  if (!window.localStorage) {
    console.error(`(〒︿〒) The browser doesn't support localstorage!!!`);
    return false;
  }

  return true;
};
_.jsonParse = (str = "") => {
  let res = null;
  try {
    res = JSON.parse(str);
  } catch (e) {
    console.error(`(〒︿〒) Parse josnString error!!!`);
    return null;
  }
  return res;
};
_.makeConsoleStr = (arr = []) => {
  if (!arr || _.typeOf(arr) !== "array" || !arr.length) {
    return "";
  }

  let resStr = "\n";

  arr.forEach(str => {
    resStr += `\t${str}\n`;
  });

  return `${resStr}\n`;
};
_.transKey = (obj = {}, transKeys = {}) => {
  if (_.typeOf(obj) !== "object") {
    return obj;
  }

  const res = {};

  Object.keys(obj).forEach(k => {
    res[transKeys[k] || k] = obj[k];
  });

  return res;
};

export default _;
