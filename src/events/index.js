const { TP_FAMILY } = require('../constant');
const { encode, isJson } = require('../helper/lib');

const eventResolver = (context, eventType, eventAttribute, eventData) => {
    let model = isJson(eventData) ? JSON.stringify(eventData) : eventData;
    context.addEvent(TP_FAMILY +'/'+ eventType, eventAttribute, Buffer.from(model,'utf-8'));
}

const recieptResolver = (context, transactionRecipt) => {
    let model = isJson(transactionRecipt) ? JSON.stringify(transactionRecipt) : transactionRecipt;
    context.addReceiptData(Buffer.from(model,'utf-8'));
}

module.exports = {
    eventResolver,
    recieptResolver,
}