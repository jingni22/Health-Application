var snowflake = require('snowflake-sdk');
var crypto = require('crypto');
var fs = require('fs');


var account_identifier = "...";
var username = "...";
var privateKeyFile = fs.readFileSync('...');
var privateKeyPath = '...';
var privateKeyPass = '...';

// Get the private key from the file as an object.
const privateKeyObject = crypto.createPrivateKey({
  key: privateKeyFile,
  format: 'pem',
  passphrase: '...'
});

// Extract the private key from the object as a PEM-encoded string.
var privateKey = privateKeyObject.export({
  format: 'pem',
  type: 'pkcs8'
});

// Use the private key for authentication.
// https://docs.snowflake.com/en/developer-guide/node-js/nodejs-driver-authenticate
var connection = snowflake.createConnection({
  account: account_identifier,
  username: username,
  role: "ACCOUNTADMIN",
  authenticator: "SNOWFLAKE_JWT",
  privateKeyPath: privateKeyPath,
  privateKeyPass: privateKeyPass,
  database: "HEALTH_APPLICATION",
  schema: "PUBLIC"
});

// Establish a connection.
connection.connect((err, conn) => {
  if (err) {
    console.error('Connection failed due to the following error:', err.message);
  } else {
    console.log('Successfully connected to Snowflake');

  }
});


module.exports = connection;