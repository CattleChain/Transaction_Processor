const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')
const { createAnimalIdentity, getAnimalIdentity } = require('./states/animalIdentityState');
const { TP_FAMILY, TP_VERSION, TP_NAMESPACE, PAYLOAD_ACTIONS } = require("./constant")
const cbor = require('cbor');

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
        
        let payload = cbor.decode(txn.payload);

        if (typeof payload.action === undefined) {
            throw new InvalidTransaction('action Type is missing');
        }

        const action = payload.action;
        console.log('action', action);
        if (action === PAYLOAD_ACTIONS.CREATE_ANIMAL_IDENTIY) {
            return await createAnimalIdentity(context, payload.data);
        } else if (action === PAYLOAD_ACTIONS.GET_ANIMAL_IDENTITY) {
            return await getAnimalIdentity(context, payload.data);
        }
        else {
            throw new InvalidTransaction(
                `Action ${payload.action} is not valid`
            )
        }
    }
}

module.exports = CattleChainHandler;