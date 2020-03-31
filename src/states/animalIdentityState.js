const { TIMEOUT } = require("../constant");
const { createAccount } = require("../helper/accounts");
const { encode } = require('../helper/lib');

class AnimalIdentityState {
    constructor(context) {
        this.context = context;
        this.timeout = TIMEOUT;
        this.stateEntries = {};
    }

    /*
    ** Payload Model (temp) need to be change to protobuf
    {
        type: 'animal',
        action:"create_animal_identity",
          data:{
            id:"1",
            type:"animal",
            species:"GOAT",
            legalId:"passport:123232",
            birthdate:"dsds",
            sex:"male"
          }
    }
    */
    createAnimalIdentity(obj) {

        return new Promise((resolve, reject) => {
            const uniqueIdentity = obj.legalId.toString();
            const address = createAccount(uniqueIdentity);

            return this.context.getState([address], this.timeout)
                .then((stateEntries) => {
                    let stateValue = stateEntries[address];
                    if (stateValue && stateValue.length) {
                        reject('Asset exists');
                    }

                    const stateEntriesSend = {};
                    stateEntriesSend[address] = encode(obj);

                    return this.context.setState(stateEntriesSend, this.timeout);
                }).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    /*
    ** Payload Model (temp) need to be change to protobuf
    {
        type: 'animal',
        action:"create_animal_identity",
          data:{
            id:"1",
            type:"animal",
            species:"GOAT",
            legalId:"passport:123232",
            birthdate:"dsds",
            sex:"male"
          }
    }
    */
    getAnimalIdentity(obj) {
        return new Promise((resolve, reject) => {
            const uniqueIdentity = obj.legalId.toString();
            const address = createAccount(uniqueIdentity);
            
            return this.context.getState([address], this.timeout).then((stateEntries) => {
                Object.assign(this.stateEntries, stateEntries);
                resolve(this.stateEntries);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = AnimalIdentityState;