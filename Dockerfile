FROM node:12.13.0

WORKDIR /FIWARE_Cattlechain_Sawtooth_tp

COPY package.json .

RUN npm install

ENTRYPOINT ["/usr/local/bin/node", "index.js"]