var {TP_NAMESPACE } = require("../constant");
var { _hash } = require("./lib");

createAccount = (x) => {
    return TP_NAMESPACE + _hash(x);
}

module.exports = {
    createAccount,
}