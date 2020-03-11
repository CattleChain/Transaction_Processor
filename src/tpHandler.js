const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const cbor = require('cbor')
const CattleChainState = require('./state')
var { TP_FAMILY, TP_VERSION, TP_NAMESPACE } = require("../constant")


class CattleChainHandler extends TransactionHandler {
    /**
     * TransactionHandler constructor registers itself with the
     * validator, declaring which family name, versions, and
     * namespaces it expects to handle.
     */
    constructor() {
        super(TP_FAMILY, [TP_VERSION], [TP_NAMESPACE])
    }

    /**
     * Evaluate and execute every transaction, updating the state according to the action.
     * @param {TpProcessRequest} txn Transaction process request.
     * @param {Context} context Current state context.
     */
    async apply(txn, context) {
        // Retrieve SawChain Payload from transaction.
        let payload = cbor.decode(txn.payload);
        let cattleChaintoreState = new CattleChainState(context);
        // const action = payload.action;
        // const signerPublicKey = txn.header.signerPublicKey;
        const timestamp = payload.timestamp;

        // General Transaction Validation: Timestamp is not set.
        if (!timestamp.low && !timestamp.high)
            reject(`Timestamp is not set!`);

        // Handling actions.
        switch (action) {
            case 'set':
                await cattleChaintoreState.enterValue(payload.data);
                break;

            case 'get':
                await cattleChaintoreState.getValue(payload.data);
                break;
            default:
                reject(`Unknown action: ${payload.action}`);
                throw new InvalidTransaction(`Action must be create, delete, or take not ${payload.action}`
                );
        }
    }
}

module.exports = CattleChainHandler;