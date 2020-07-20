const express= require('express')
const bodyParser=require('body-parser');
const cors=require('cors');
const knex=require('knex');
const bcrypt=require('bcrypt-nodejs')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Deshmukh',
    password : '12345',
    database : 'smart-brain'
  }
});



const app=express()
app.use(bodyParser.json());
app.use(cors());





app.get('/', (req, res)=> { db('users').returning('*').then(users=>{res.json(users)}).catch(err=>res.json(err)) })


app.post('/signin',signin.handleSignin(bcrypt,db))


app.post('/register', register.handleRegister(db,bcrypt))


app.get('/profile/:id',profile.handleProfileGet(db))



app.put('/image',image.handleImage(db))


app.listen(3000,()=>{
	console.log('app is running on port 3000')
}

)

/*

/ --> res = this is working
/signin --> Post =success/fail
/register --> post = user
/profile/:userId  --> GET - User
/image  --> PUT ---> user


*/