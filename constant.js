var { _hash } = require("./helper/lib");
const TP_FAMILY = 'CattleChain';
const version = '0.0.1';
exports.TP_FAMILY = TP_FAMILY;
exports.TP_VERSION = version;
exports.TP_NAMESPACE = _hash(TP_FAMILY).substring(0, 6);