const {TransactionProcessor} = require('sawtooth-sdk/processor');
const CattleChainHandler = require('./src/tpHandler');
// Bind SawChain TP to Validator.
const transactionProcessor = new TransactionProcessor(process.env.VALIDATOR_URL || 'tcp://localhost:4004');
// Handler recording.
const handler = new CattleChainHandler();
transactionProcessor.addHandler(handler);
// Transaction Processor (tp) start.
transactionProcessor.start();
console.log(`Starting cattchain transaction processor`)
console.log(`Connecting to Sawtooth validator at tcp://localhost:4004`)

