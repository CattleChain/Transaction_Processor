'use strict'

const path = require('path')
const _ = require('lodash')
const protobuf = require('protobufjs')

const protos = {}

const loadProtos = (filename, protoNames) => {
  const protoPath = path.resolve(__dirname, '../../../FIWARE_Cattlechain_Protos', filename)
  return protobuf.load(protoPath)
    .then(root => {
      protoNames.forEach(name => {
        protos[name] = root.lookupType(name)
      })
    })
}

const compile = () => {
  return Promise.all([
    loadProtos('animalIdentity.proto', [
      'AnimalIdentity',
      'AnimalIdentities'
    ]),
    loadProtos('payload.proto', [
      'CCPayload',
      'CreateAnimalIdentity'
    ])
  ])
}

module.exports = _.assign(protos, { compile })