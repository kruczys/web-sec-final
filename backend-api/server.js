const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./keycloak.json');
const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost'],
    credentials: true,
    optionsSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));

const memoryStore = new session.MemoryStore();

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
});

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'movies',
});




app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

app.use(bodyParser.json());

const keycloak = new Keycloak({
    store: memoryStore
}, config);

app.use(keycloak.middleware());

app.get('/public', async (req, res) => {
    const movies = await Movie.findAll();
    res.json(movies);
});

app.post('/public/add', async (req, res) => {
    const { title, rating } = req.body;
    if (!title || !rating) {
        return res.status(400).json({ message: 'Title and rating are required' });
    }
    try {
        const movie = await Movie.create({ title, rating });
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add movie', error });
    }
});

app.get('/secured', keycloak.protect(), async (req, res) => {
    const movies = await Movie.findAll();
    res.json(movies);
});

app.post('/secured/add', keycloak.protect(), async (req, res) => {
    const { title, rating } = req.body;
    if (!title || !rating) {
        return res.status(400).json({ message: 'Title and rating are required' });
    }
    try {
        const movie = await Movie.create({ title, rating });
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add movie', error });
    }
});

app.get('/admin', keycloak.protect('realm:admin'), (req, res) => {
    res.json({ message: 'This is an admin endpoint' });
});

app.listen("3001", async () => {
    await sequelize.sync();
    console.log('Server is running on port 3001');
});
