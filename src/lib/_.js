const _ = {};

_.errText = "👆Error Llocation👆";

// 类型
_.typeOf = o =>
  o === null
    ? String(o)
    : {}.toString
        .call(o)
        .slice(8, -1)
        .toLowerCase();

_.formatConsole = ({
  con = "",
  title = "localStorage Library Tips",
  type = "error"
}) => {
  const MAP = {
    normal: "#909399",
    error: "#f56c6c",
    info: "#409EFF",
    warning: "#e6a23c",
    success: "#67c23a"
  };
  const ICON = {
    normal: "🔔",
    error: "❌",
    info: "📒",
    warning: "⚠️",
    success: "✅"
  };
  const titleCss = `color: ${MAP[type]};font-size: 14px;`;
  const conCss = `color: ${MAP[type]};font-size: 12px;`;
  const formatStr = `%c\n${ICON[type]}${title}\n\n%c${con}\n`;

  console.log(formatStr, titleCss, conCss);
};
// 支持 localStorage
_.support = () => {
  if (!window.localStorage) {
    _.formatConsole({
      con: `(〒︿〒) The browser doesn't support localstorage!!!`
    });
    console.error(_.errText);
    return false;
  }

  return true;
};

// 安全 parse
_.jsonParse = (str = "") => {
  let res = null;
  try {
    res = JSON.parse(str);
  } catch (e) {
    _.formatConsole({ con: `(〒︿〒) Parse josnString error!!!` });
    console.error(_.errText);
    return null;
  }
  return res;
};
// 生成 console 字符串
_.makeConsoleStr = (arr = []) => {
  if (!arr || _.typeOf(arr) !== "array" || !arr.length) {
    return "";
  }

  let resStr = `\n`;

  arr.forEach(str => {
    resStr += `\t${str}\n`;
  });

  return `${resStr}\n`;
};
_.transKey = (obj = {}, transKeys = {}) => {
  if (_.typeOf(obj) !== "object" || _.typeOf(transKeys) !== "object") {
    return obj;
  }

  const res = {};

  Object.keys(obj).forEach(k => {
    res[transKeys[k] || k] = obj[k];
  });

  return res;
};
_.collectByKey = (obj = {}, keys = {}) => {
  const keysT = _.typeOf(keys);
  if (
    _.typeOf(obj) !== "object" ||
    !(keysT === "object" || keysT === "array")
  ) {
    return obj;
  }

  const res = {};

  const _arr = keysT === "array" ? keys : Object.keys(keys);

  _arr.forEach(k => {
    if (obj[k] !== undefined) {
      res[k] = obj[k];
    }
  });

  return res;
};

export default _;
