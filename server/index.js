require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , checkForSession = require('./middlewares/checkForSession')
    , swag_controller = require('./controllers/swag_controller')
    , auth_controller = require('./controllers/auth_controller')
    , cart_controller = require('./controllers/cart_controller')
    , search_controller = require('./controllers/search_controller')

const app = express();

app.use(bodyParser.json());//this makes it so we can read JSON from the request body.
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true
}))

app.use(checkForSession);
app.use( express.static( `${__dirname}/../public/build` ) );

//swaggy swag
app.get('/api/swag', swag_controller.read);

//auth stuff
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

//cart stuff
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

//search stuff
app.get( '/api/search', search_controller.search );


const PORT = 3000;
app.listen( PORT, ()=>console.log(`Server is listening on port: ${PORT}.`));