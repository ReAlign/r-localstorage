import _ from "./_";

const Trans = {};

Trans.transMap = {
  t: "timestampSaved",
  v: "value"
};
Trans.$trans = (obj = {}) => _.transKey(obj, Trans.transMap);

export default Trans;
