const { createAccount } = require("../helper/accounts");
const { dairyIdentity_pb } = require('cattlechain_protos');

// create farm identity
async function createFarmIdentity(context, payload) {
    const info = dairyIdentity_pb.DairyIdentity.deserializeBinary(payload);
    if (info.getId() == null || info.getId() == '') {
        console.log('farm Id is missing');
    } else {
        var address = createAccount(info.getId());
        let stateEntriesSend = {};
        stateEntriesSend[address] = payload;
        const data = await context.getState([address]);
        const info1 = dairyIdentity_pb.DairyIdentity.deserializeBinary(data[address]);
        if (info1.getId() != info.getId()) {
            const transaction = await context.setState(stateEntriesSend);
            console.log('asset created', transaction);
        } else {
            console.log('asset already exits');
        }
    }
}
// update farm identity
async function updateFarmIdentity(context, payload) {
    const info = dairyIdentity_pb.DairyIdentity.deserializeBinary(payload);
    if (info.getId() == null || info.getId() == '') {
        console.log('farm Id is missing');
    } else {
        var address = createAccount(info.getId());
        let stateEntriesSend = {};
        stateEntriesSend[address] = payload;
        const data = await context.getState([address]);
        const info1 = dairyIdentity_pb.DairyIdentity.deserializeBinary(data[address]);
        if (info1.getId() == info.getId()) {
            const transaction = await context.setState(stateEntriesSend);
            console.log('asset update', transaction);
        } else {
            console.log('asset does not exits');
        }
    }
}


module.exports = {
    createFarmIdentity,
    updateFarmIdentity,
}