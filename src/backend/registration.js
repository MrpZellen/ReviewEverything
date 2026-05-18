import mongoose from 'mongoose';
import User from './models/User.js';
import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('database', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5400,
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    description: String,
    movieReviews: [String],
    isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());


const User = require('./models/User'); 


class User {
    constructor(username, description, movieReviews, isAdmin) {
        this.username = username;
        this.description = description;
        this.movieReviews = movieReviews;
        this.isAdmin = isAdmin;
    }
}

const registration = {
    register: async (req, res) => {
        const { username, description, movieReviews, isAdmin } = req.body;
        try {
            const newUser = new User(username, description, movieReviews, isAdmin);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to register user' });
        }
    }
} 