var { _hash } = require("../helper/lib");
var { TP_NAMESPACE } = require("../constant");

class CattleChainState {
    constructor(context) {
        this.context = context;
        this.timeout = 500;
        this.stateEntries = {};
    }

    enterValue(value) {
        var address = makeAddress(value);
        var stateEntriesSend = {};
        stateEntriesSend[address] = Buffer.from(value);
        // this.context.addEvent (event can be added);
        return  this.context.setState(stateEntriesSend, this.timeout).then(function(result) {
            return result;
        }).catch(function(error) {
            return error;
        })
    }

    getValue(value) {
        var address = makeAddress(value);
        return this.context.getState([address], this.timeout).then(function(stateEntries) {
            Object.assign(this.stateEntries, stateEntries);
            console.log(this.stateEntries[address].toString())
            return  this.stateEntries;
          }.bind(this));
    }
}

const makeAddress = (x, label) => TP_NAMESPACE + _hash(x)

module.exports = CattleChainState;