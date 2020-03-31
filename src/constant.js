var { _hash } = require("./helper/lib");

// Transaction Processor Family
const TP_FAMILY = 'CattleChain';
// Transaction Processor Version
const TP_VERSION = '0.0.2';
// Transaction Processor Namespace
// https://sawtooth.hyperledger.org/docs/core/nightly/1-1/app_developers_guide/address_and_namespace.html#namespace-prefix
const TP_NAMESPACE = _hash(TP_FAMILY).substring(0, 6);
// max timeout 
const TIMEOUT = 1000;

const VALIDATOR_URL = process.env.VALIDATOR_URL || 'tcp://localhost:4004';

const PAYLOAD_ACTIONS = {
    CREATE_ANIMAL_IDENTIY: 'create_animal_identity',
    GET_ANIMAL_IDENTITY: 'get_animal_identity',
    GET_ALL_ANIMAL_IDENTITIES: 'get_animal_identities',
    UPDATE_ANIMAL_IDENTITY: 'update_animal_identity',
    CREATE_FARM_IDENTITY: 'create_farm_identity',
    GET_FARM_IDENTITY: 'get_farm_identity',
    UPDATE_FARM_IDENTITY: 'update_farm_identity',
}

const PAYLOAD_TYPES = {
    TYPE_ANIMAL: 'animal',
    TYPE_FARM: 'farm',
}
module.exports = {
    TP_FAMILY,
    TP_VERSION,
    TP_NAMESPACE,
    TIMEOUT,
    PAYLOAD_TYPES,
    PAYLOAD_ACTIONS,
    VALIDATOR_URL,
}