const { createAccount } = require("../helper/accounts");
const { animalIdentity_pb } = require('cattlechain-proto');
const { PAYLOAD_ACTIONS } = require('../constant');

async function createAnimalIdentity(context, payload) {
    const info = animalIdentity_pb.AnimalIdentity.deserializeBinary(payload);
    if (info.getLegalid() == null || info.getLegalid() == '') {
        console.log('legal Id is missing');
        context.addEvent('CattleChain/AddAnimalEvent',
            [
                ['status', 'false'],
                ['message', 'legal ID is missing']
            ], 'legal Id is missing');
    } else {
        var address = createAccount(info.getLegalid());
        let stateEntriesSend = {};
        stateEntriesSend[address] = payload;
        const data = await context.getState([address]);
        const info1 = animalIdentity_pb.AnimalIdentity.deserializeBinary(data[address]);
        if (info1.getLegalid() != info.getLegalid()) {
            const transaction = await context.setState(stateEntriesSend);
            console.log('asset created', transaction);
            context.addEvent('CattleChain/CreateIdentity',
                [
                    ['address', address],
                    ['asset_id', info.getLegalid()],
                    ['payload', payload.toString()],
                    ['status', 'true'],
                    ['message', 'asset created']
                ], 'asset created');
        } else {
            console.log('asset already exits');
            context.addEvent('CattleChain/CreateIdentity',
                [
                    ['address', address],
                    ['asset_id', info.getLegalid()],
                    ['status', 'false'],
                    ['message', 'asset already exist']
                ], 'asset already exist');
        }
    }
}

async function addAnimalEvents(context, payload) {
    const info = animalIdentity_pb.AnimalIdentity.deserializeBinary(payload);
    if (info.getLegalid() == null || info.getLegalid() == '') {
        console.log('legal Id is missing');
        context.addEvent('CattleChain/AddAnimalEvent',
            [
                ['status', 'false'],
                ['message', 'legal ID is missing']
            ], 'legal Id is missing');
    } else {
        var address = createAccount(info.getLegalid());
        const data = await context.getState([address]);
        const info1 = animalIdentity_pb.AnimalIdentity.deserializeBinary(data[address]);
        //asset exists
        if (info1.getLegalid() == info.getLegalid()) {
            console.log('exists');
            // add coming event
            for (const item of info.getEventsList()) {
                let event = new animalIdentity_pb.AnimalMonitoringEvent();
                let stateEntriesSend = {};
                event.setActityalert(item.getActityalert());
                event.setTempraturealert(item.getTempraturealert());
                event.setWeightalert(item.setWeightalert());
                event.setDrikingbehaviouralert(item.getDairytimealert());
                event.setResttimealert(item.getResttimealert());
                event.setDairytimealert(item.getDairytimealert());
                info1.getEventsList().push(event);
                let payload = info1.serializeBinary();
                stateEntriesSend[address] = payload;
                const transaction = await context.setState(stateEntriesSend);
                console.log('event created', transaction);
                context.addEvent('CattleChain/AddAnimalEvent',
                    [
                        ['address', address],
                        ['asset_id', info.getLegalid()],
                        ['payload', payload.toString()],
                        ['status', 'true'],
                        ['message', 'asset does not exist']
                    ], 'asset does not exist');
            }
        } else {
            console.log('asset does not exists');
            context.addEvent('CattleChain/AddAnimalEvent',
                [
                    ['address', address],
                    ['asset_id', info.getLegalid()],
                    ['status', 'false'],
                    ['message', 'asset does not exist']
                ], 'asset does not exist');
        }
    }
}


module.exports = {
    createAnimalIdentity,
    addAnimalEvents,
}