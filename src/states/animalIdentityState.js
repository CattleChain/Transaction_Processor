const { createAccount } = require("../helper/accounts");
const { animalIdentity_pb } = require('cattlechain-proto');
const { PAYLOAD_ACTIONS } = require('../constant');
const { eventResolver, recieptResolver } = require('../events');
// const cbor = require('cbor');

async function createAnimalIdentity (context, payload) {
    const info = animalIdentity_pb.AnimalIdentity.deserializeBinary(payload);
    var address = createAccount(info.getLegalid());
    let stateEntriesSend = {};
    stateEntriesSend[address] = payload;
    const data = await context.getState([address]);
    const info1 = animalIdentity_pb.AnimalIdentity.deserializeBinary(data[address]);
    if(info1.getLegalid() != info.getLegalid()) {
        const transaction = await context.setState(stateEntriesSend);
        console.log('asset created', transaction);
        context.addEvent('CattleChain/CreateIdentity',[['address',address.toString()]], 'asset created');
        // Add Event 
        // eventResolver(context, PAYLOAD_ACTIONS.CREATE_ANIMAL_IDENTIY,address, {'transaction' : transaction[0], 'protobuf': payload , 'status': 'created', 'message': 'Asset Created'});
        // Add Reciept
        // recieptResolver(context, {transaction : transaction[0], protobuf: payload });
    } else {
        console.log('asset already exits');
        context.addEvent('CattleChain/CreateIdentity',[['address',address.toString()]], 'asset already exists');
        // eventResolver(context, PAYLOAD_ACTIONS.CREATE_ANIMAL_IDENTIY,address, {'transaction' : null, 'protobuf': payload , 'status': 'falied', 'message': 'Asset Already Exist'});
    }
}

async function addAnimalEvents (context, payload) {
    const info = animalIdentity_pb.AnimalIdentity.deserializeBinary(payload);
    var address = createAccount(info.getLegalid());
    console.log(info.getEventsList());
    if(info1.getLegalid() == info.getLegalid()) {
        const transaction = await context.setState(stateEntriesSend);
        console.log('asset created', transaction);
    } else {
        console.log('asset does not exits');
    }
}

// async function getAnimalIdentity (context, payload) {
//     const info = animalIdentity_pb.AnimalIdentity.deserializeBinary(payload);
//     var address = createAccount(info.getLegalid());
//     const data = await context.getState([address]);
//     const info1 = animalIdentity_pb.AnimalIdentity.deserializeBinary(data[address]);
//     console.log('info', info1.toString());
// }

module.exports = {
    createAnimalIdentity,
    // getAnimalIdentity,
}