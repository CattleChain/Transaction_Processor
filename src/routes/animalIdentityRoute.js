const { AnimalIdentityState } = require('../states');
const { PAYLOAD_ACTIONS } = require('../constant');

createAnimalIdentity = (context, payload) => {
    const aninalState = new AnimalIdentityState(context);
    aninalState.createAnimalIdentity(payload).then((res) => {
        console.log('result', JSON.stringify(res));
        return res;
    }).catch((err) => {
        console.log('error', err);
        return err;
    });
},

getAnimalIdentity = (context, payload) => {
    const aninalState = new AnimalIdentityState(context);
    aninalState.getAnimalIdentity(payload).then((res) => {
        console.log('result', JSON.stringify(res));
        return res;
    }).catch((err) => {
        console.log('error', err);
        return err;
    });
}

executeTransaction = async (action, context, payload) => {
    switch (action) {
        case PAYLOAD_ACTIONS.CREATE_ANIMAL_IDENTIY:
            return await createAnimalIdentity(context, payload);
        case PAYLOAD_ACTIONS.GET_ANIMAL_IDENTITY:
            return await getAnimalIdentity(context,payload);
        default:
            throw new InvalidTransaction(`Action ${action} is not valid`);
    }
}

module.exports = {
    executeTransaction,
}