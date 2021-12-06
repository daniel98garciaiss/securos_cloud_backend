const express = require('express');
const app = express();
const cors = require('cors');
const { config } = require('./config/index');
const usersApi = require('./routes/users.js');
const authApi = require('./routes/auth');

app.use(cors());
// middleWare BODY PARSER
app.use(express.json());

authApi(app);
usersApi(app);
// friendsA

app.listen(config.port, function(){
    console.log(`Listenig http://localhost:${config.port}`);
});