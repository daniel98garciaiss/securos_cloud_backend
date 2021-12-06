// DEBUG=app:* node scripts/mongo/seedApiKeys.js
// sin dubug si te da problemas node scripts/mongo/seedApiKeys.js


const chalk = require('chalk');
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api-keys');
const MongoLib = require('../../lib/mongo');

const fullScopes = [
  'signin:auth',
  'signup:auth',

  'read:camaras',
  'create:camaras',
  'update:camaras',
  'delete:camaras',

  'read:users',
  'create:users',
  'update:users',
  'delete:users',

];

const middleScopes = [
  'signin:auth',
  'signup:auth',

  'read:camaras',
  'create:camaras',
  'update:camaras',
  'delete:camaras',

  'read:users',
  // 'create:users',
  // 'update:users',
  // 'delete:users',

];

const basicScopes = [
  'signin:auth',
  'signup:auth',

  'read:camaras',
];
const publicScopes = [
  'signin:auth',
  'signup:auth',
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: fullScopes
  },
  {
    token: generateRandomToken(),
    scopes: middleScopes
  },
  {
    token: generateRandomToken(),
    scopes: basicScopes
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes
  }
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async apiKey => {
      await mongoDB.create('api-keys', apiKey);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedApiKeys();
