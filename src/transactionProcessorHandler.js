const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')
const { createAnimalIdentity, updateAnimalIdentity } = require('./states/animal_state');
const { createFarmIdentity, updateFarmIdentity } = require('./states/dairy_state');
const { AnimalMonitoring, AnimalWelfareIndicators } = require('./states/device_state');
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
        // check action type
        if (action === PAYLOAD_ACTIONS.CREATE_ANIMAL_IDENTIY) {
            //create animal identity
            return await createAnimalIdentity(context, payload.data);
        }else if (action === PAYLOAD_ACTIONS.UPDATE_ANIMAL_IDENTITY) {
            // update animal identity
            return await updateAnimalIdentity(context, payload.data);
        }else if (action === PAYLOAD_ACTIONS.CREATE_DAIRY_IDENTITY) {
            // crete farm identity
            return await createFarmIdentity(context, payload.data);
        }else if (action === PAYLOAD_ACTIONS.UPDATE_DAIRY_IDENTITY) {
            // update farm identity
            return await updateFarmIdentity(context, payload.data);
        }else if (action === PAYLOAD_ACTIONS.ADD_ANIMAL_MONITORING_EVENT) {
            // animal monitoring events
            return await AnimalMonitoring(context, payload.data);
        }else if (action === PAYLOAD_ACTIONS.UPDATE_ANIMAL_IDENTITY) {
            // animal welfare indicators
            return await AnimalWelfareIndicators(context, payload.data);
        }
        else {
            throw new InvalidTransaction(
                `Action ${payload.action} is not valid`
            )
        }
    }
}

module.exports = CattleChainHandler;