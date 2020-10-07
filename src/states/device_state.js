const { createAccount } = require("../helper/accounts");
const { deviceEvents_pb } = require('cattlechain_protos');


// monitoring events (to be fixed)
async function AnimalMonitoring(context, payload) {
    const info = deviceEvents_pb.DeviceEvents.deserializeBinary(payload);
    if (info.getId() == null || info.getId() == '') {
        console.log('device Id is missing');
    } else {
        var address = createAccount(info.getId());
        const data = await context.getState([address]);
        const info1 = deviceEvents_pb.DeviceEvents.deserializeBinary(data[address]);
        //asset exists
        if (info1.getId() == info.getId()) {
            console.log('exists');
            // add coming event
            for (const item of info.getMonitoringList()) {
                let event = new deviceEvents_pb.AnimalMonitoring();
                let stateEntriesSend = {};
                event.setMonitoring(item.getMonitoring());
                info1.getMonitoringList().push(event);
                let payload = info1.serializeBinary();
                stateEntriesSend[address] = payload;
                const transaction = await context.setState(stateEntriesSend);
                console.log('event created', transaction);
            }
        } else {
            console.log('asset does not exists');
        }
    }
}

// Animal Welfare Indicators events
async function AnimalWelfareIndicators(context, payload) {
    const info = deviceEvents_pb.DeviceEvents.deserializeBinary(payload);
    if (info.getId() == null || info.getId() == '') {
        console.log('device Id is missing');
    } else {
        var address = createAccount(info.getId());
        const data = await context.getState([address]);
        const info1 = deviceEvents_pb.DeviceEvents.deserializeBinary(data[address]);
        //asset exists
        if (info1.getId() == info.getId()) {
            console.log('exists');
            // add coming event
            for (const item of info.getIndicatorsList()) {
                let event = new deviceEvents_pb.AnimalWelfareIndicators();
                let stateEntriesSend = {};
                event.setIndicator(item.getIndicator());
                info1.getIndicatorsList().push(event);
                let payload = info1.serializeBinary();
                stateEntriesSend[address] = payload;
                const transaction = await context.setState(stateEntriesSend);
                console.log('event created', transaction);
            }
        } else {
            console.log('asset does not exists');
        }
    }
}

module.exports = {
    AnimalMonitoring,
    AnimalWelfareIndicators,
}