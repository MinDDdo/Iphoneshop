const mongoose = require('mongoose');
const dotnev = require('dotenv');
const app = require('./app');

dotnev.config({ path: './.env'});


const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD);

mongoose.set('strictQuery' , false);

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(con => {
    console.log(con.connections);
});

const port = process.env.PORT | 8080;

app.listen(port, () => {
    console.log('App running on port' + port);
});