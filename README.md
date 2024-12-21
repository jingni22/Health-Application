 # Required installations
nodejs
snowflake-sdk
cors
express
react
nodemon

# Authentication 
To connect to snowflake server, key-pair authentication is used.
https://docs.snowflake.com/en/user-guide/key-pair-auth


# Connect to Snowflake using Node.js
`var connection = snowflake.createConnection({
    account: account,
    username: user,
    password: password,
    application: application,
    database: database,
    schema: schema
});`
https://docs.snowflake.com/en/developer-guide/node-js/nodejs-driver-connect
