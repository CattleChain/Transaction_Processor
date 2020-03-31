const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')
const { AnimalIdentityRoute, FarmIdentityRoute } = require('./routes');
const { TP_FAMILY, TP_VERSION, TP_NAMESPACE, PAYLOAD_TYPES, PAYLOAD_ACTIONS } = require("./constant")
const protos = require('./helper/proto');
const cbor = require('cbor')

class CattleChainHandler extends TransactionHandler {
    /**
     * TransactionHandler constructor registers itself with the
     * validator, declaring which family name, versions, and
     * namespaces it expects to handle.
     */
    constructor() {
        super(TP_FAMILY, [TP_VERSION], [TP_NAMESPACE])
        this.initialzer();
    }

    async initialzer() {
        await protos.compile();
    }
    /**
     * Evaluate and execute every transaction, updating the state according to the action.
     * @param {TpProcessRequest} txn Transaction process request.
     * @param {Context} context Current state context.
     */
    async apply(txn, context) {

        let payload = cbor.decode(txn.payload);

        if (typeof payload.type === undefined) {
            throw new InvalidTransaction('entity Type is missing');
        }

        const type = payload.type;

        if (typeof payload.action === undefined) {
            throw new InvalidTransaction('action Type is missing');
        }

        const action = payload.action;

        switch (type) {
            case PAYLOAD_TYPES.TYPE_ANIMAL:
                return await AnimalIdentityRoute.executeTransaction(action, context, payload.data);
            case PAYLOAD_TYPES.TYPE_FARM:
                return await FarmIdentityRoute.executeTransaction(action, context, payload.data);
            default:
                throw new InvalidTransaction(`Type ${type} is not valid`);
        }
    }
}

module.exports = CattleChainHandler;