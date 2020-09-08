const { createAccount } = require("../helper/accounts");
const { animalIdentity_pb } = require('cattlechain_protos');

// create animal identity
async function createAnimalIdentity(context, payload) {
    const info = animalIdentity_pb.AnimalIdentity.deserializeBinary(payload);
    if (info.getLegalid() == null || info.getLegalid() == '') {
        console.log('legal Id is missing');
        context.addEvent('cattlechain/add-animal',
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
            context.addEvent(
                'cattlechain/add-animal',
                [['address', address],['asset', info.getLegalid()], ['status', 'true'],['message', 'asset does not exist']],
                null);
        } else {
            console.log('asset already exits');
            context.addEvent(
                'cattlechain/add-animal',
                [['address', address],['asset', info.getLegalid()], ['status', 'false'],['message', 'asset already exist']],
                null);
        }
    }
}

// update animal identity
async function updateAnimalIdentity(context, payload) {
    const info = animalIdentity_pb.AnimalIdentity.deserializeBinary(payload);
    if (info.getLegalid() == null || info.getLegalid() == '') {
        console.log('legal Id is missing');
        context.addEvent('cattlechain/add-animal',
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
        if (info1.getLegalid() == info.getLegalid()) {
            const transaction = await context.setState(stateEntriesSend);
            console.log('asset update', transaction);
            context.addEvent(
                'cattlechain/update-animal',
                [['address', address],['asset', info.getLegalid()], ['status', 'true'],['message', 'asset updated']],
                null);
        } else {
            console.log('asset does not exits');
            context.addEvent(
                'cattlechain/update-animal',
                [['address', address],['asset', info.getLegalid()], ['status', 'false'],['message', 'asset does not exist']],
                null);
        }
    }
}

// monitoring events (to be fixed)
async function AnimalMonitoring(context, payload) {
    const info = animalIdentity_pb.AnimalIdentity.deserializeBinary(payload);
    if (info.getLegalid() == null || info.getLegalid() == '') {
        console.log('legal Id is missing');
        context.addEvent('cattlechain/add-animal-event',
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
                event.setWeightalert(item.getWeightalert());
                event.setDrikingbehaviouralert(item.getDairytimealert());
                event.setResttimealert(item.getResttimealert());
                event.setDairytimealert(item.getDairytimealert());
                info1.getEventsList().push(event);
                let payload = info1.serializeBinary();
                stateEntriesSend[address] = payload;
                const transaction = await context.setState(stateEntriesSend);
                const eventPayload = {
                    'activityAlert':item.getActityalert(),
                    'temratureAlert':item.getTempraturealert(),
                    'weightAlert': item.getWeightalert(),
                    'drinkingAlert':item.getDairytimealert(),
                    'resttimeAlert':item.getResttimealert(),
                    'dairyAlert':item.getDairytimealert()
                }
                console.log('event created', transaction);
                context.addEvent(
                    'cattlechain/add-animal-event',
                    [['address', address],['asset', info.getLegalid()], ['status', 'true'],['payload', JSON.stringify(eventPayload)],['message', 'event added']],
                    null);
            }
        } else {
            console.log('asset does not exists');
            context.addEvent(
                'cattlechain/add-animal-event',
                [['address', address],['asset', info.getLegalid()], ['status', 'false'],['message', 'asset does not exist']],
                null);
        }
    }
}

// to be fixed
async function AnimalWelfareIndicators(context, payload) {
}


module.exports = {
    createAnimalIdentity,
    updateAnimalIdentity,
    AnimalMonitoring,
    AnimalWelfareIndicators
}