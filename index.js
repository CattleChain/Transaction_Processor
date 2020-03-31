const {TransactionProcessor} = require('sawtooth-sdk/processor');
var { VALIDATOR_URL } = require("./src/constant")
const CattleChainHandler = require('./src/transactionProcessorHandler');
// Bind SawChain TP to Validator.
const transactionProcessor = new TransactionProcessor(VALIDATOR_URL);
// Handler recording.
const handler = new CattleChainHandler();
transactionProcessor.addHandler(handler);
// Transaction Processor (tp) start.
console.log('VALIDATOR_URL',VALIDATOR_URL);
transactionProcessor.start();
console.log(`Starting cattchain transaction processor`)
console.log(`Connecting to Sawtooth validator at tcp://localhost:4004`)

