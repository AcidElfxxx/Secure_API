require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createTokens, validateToken } = require('./JWT');

app.use(express.json());
app.use(cookieParser());

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);


app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username: username,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ username });
        const dbPassword = user.password

        // If the user doesn't exist or password is incorrect
        if (!user || !(await bcrypt.compare(password, dbPassword))) {
            return res.status(400).send('Invalid credentials');
        }

        const accessToken = createTokens(user)

        res.cookie("access-token", accessToken, { maxAge: 60*10*1000 })

        res.send("LOGGED IN");
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/profile', validateToken, (req, res) => {

    res.send('Profile')
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connected to database')
    app.listen(3000, () => {
        console.log("Port is 3000")
    });
}).catch((error) => {
    console.log(error)
})