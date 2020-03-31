const protobufjs = require("protobufjs");

AnimalIdentityProtoDecode = (payload) => {
    return Promise((resolve, reject) => {
        protobufjs.load("../protos/animalIdentity.proto", (err, root) => {
            if(err) {
                reject(err)
            }
            let protoParser = root.lookup('CattleChain.ANIMALIDENTITY');
            resolve(protoParser.decode(payload));
        })
    });
}

AnimalIdentityProtoEncode = (payload) => {
    return Promise((resolve, reject) => {
        protobufjs.load("../protos/animalIdentity.proto", (err, root) => {
            if(err) {
                reject(err)
            }
            let protoParser = root.lookup('CattleChain.ANIMALIDENTITY');
            resolve(protoParser.encode(payload).finish());
        })
    });
}

module.exports = {
    AnimalIdentityProtoDecode,
    AnimalIdentityProtoEncode,
}