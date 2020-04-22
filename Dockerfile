FROM node:12.13.0

WORKDIR /FIWARE_Cattlechain_Sawtooth_tp

COPY . .

RUN rm -rf ./node_modules

RUN npm install

#Running the project
CMD [ "npm", "start"]