const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const { Sequelize, DataTypes } = require('sequelize');

const config = require('./keycloak.json');
const app = express();
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

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

const keycloak = new Keycloak({
    store: memoryStore
}, config);

app.use(keycloak.middleware());

app.get('/public', (req, res) => {
    res.json({ message: 'This is a public endpoint' });
});

app.get('/secured', keycloak.protect(), (req, res) => {
    res.json({ message: 'This is a secured endpoint' });
});

app.get('/admin', keycloak.protect('realm:admin'), (req, res) => {
    res.json({ message: 'This is an admin endpoint' });
});

app.listen("3001", async () => {
    await sequelize.sync();
    console.log('Server is running on port 3001');
});
