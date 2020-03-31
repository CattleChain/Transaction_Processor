const { FarmIdentityState } = require('../states');
const { PAYLOAD_ACTIONS } = require('../constant');

createFarmIdentity = (context, payload) => {
    const aninalState = new FarmIdentityState(context);
    aninalState.createFarmIdentity(payload).then((res) => {
        console.log('result', JSON.stringify(res));
        return res;
    }).catch((err) => {
        console.log('error', err);
        return err;
    });
},

getFarmIdentity = (context, payload) => {
    const aninalState = new FarmIdentityState(context);
    aninalState.getFarmIdentity(payload).then((res) => {
        console.log('result', JSON.stringify(res));
        return res;
    }).catch((err) => {
        console.log('error', err);
        return err;
    });
}

executeTransaction = async (action, context, payload) => {
    switch (action) {
        case PAYLOAD_ACTIONS.CREATE_FARM_IDENTITY:
            return await createFarmIdentity(context, payload);
        case PAYLOAD_ACTIONS.GET_FARM_IDENTITY:
            return await getFarmIdentity(context,payload);
        default:
            throw new InvalidTransaction(`Action ${action} is not valid`);
    }
}

module.exports = {
    executeTransaction,
}