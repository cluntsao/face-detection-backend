const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const Signin = require("./controllers/signin");
const Register = require("./controllers/register");
const Profile = require("./controllers/profile");
const image = require('./controllers/image');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '8815',
      database : 'smartbrain'
    }
  });


// const PORT = process.env.PORT;
const PORT = 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json("Hello World!");
})

app.post('/signin', Signin.handleSignin(knex, bcrypt))

app.post('/register', Register.handleRegister(knex, bcrypt))

app.get('/profile/:id', Profile.getProfile(knex))

app.put('/image', image.handleImage(knex))

app.post('/imageurl', image.handleApiCall())


app.listen(process.env.PORT || PORT, () => {
    console.log(`api listening on port ${process.env.PORT}`)
})