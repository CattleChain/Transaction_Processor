const crypto = require("crypto");

exports._hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64);
exports.encode = obj => Buffer.from(JSON.stringify(obj, Object.keys(obj).sort()));
exports.decode = buf => JSON.parse(buf.toString());
exports.isJson = (x) => { try { JSON.parse(x); } catch (e) { return false; } return true; }