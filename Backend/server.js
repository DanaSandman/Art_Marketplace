const express = require('express')
const cors = require('cors')
const path = require('path');
const expressSession = require('express-session')
// const bodyParser = require('body-parser');

// const cookieParser = require('cookie-parser');
const app = express()
const http = require('http').createServer(app)


const session = expressSession({
    secret: 'some secret string',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

// Express App Config
app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        // origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000','http://localhost:3030'],
        credentials: true
    }
    //פונקציית קרוס מאפשרת לעבוד בין הדומיינים
    app.use(cors(corsOptions))
}
// Access-Control-Allow-Origin: 'http://localhost:3000'


const artRoutes = require('./api/art/art.routes')
const userRoutes = require('./api/user/user.routes')
const authRoutes = require('./api/auth/auth.routes')
//ROUTES*******************************
app.use('/api/art', artRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//*************************************

// const artService = require('./api/art/art.service')
// const userService = require('./service/userService')

// const logger = require('./service/logger.service.js')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    // logger.info('Server is running on port: ' + port)
    console.log('Server is running on port: ' + port);
})
console.log('I am Here!')


//-----------------------------------זבל
// app.listen(port,
//     () => console.log('Server listening on port', port)
//     )
    // const corses = {
    //     origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
    // }
    
    // Config Express Application
    // app.use(express.static('public'))
    // app.use(bodyParser.json())
    // app.use(express.json())
    // app.use(cors(corses))
    // app.use(cookieParser());
    // app.use(session({

