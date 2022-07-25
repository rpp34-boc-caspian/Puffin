const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const pool = require('../db/index.js'); //Hello
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

app.post('/signup', (req, res) => {
  console.log('REQUEST', req.body);

  // EITHER

  // Do the signup stuff (encrypt password)
  // Then send info to database (Need to find out if there is a way to make sure there are no repeats in the User table)

  // OR

  // Query the database for the username and email
  // If it exists, send back that the username is taken in a reason object
  // If it doesn't, do the signup stuff

  res.json({created: false, reason: 'email'});
});

app.post('/login', async (req, res) => {
  console.log('REQUEST', req.body);

  let { username, email, password } = req.body;

  // Request to database for username provided
  // Check for what a failed request returns
  pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
  .then((results) => {
    console.log(results.rows);

    // If username doesn't exist in database, return false
    if (results.rows.length === 0) {
      console.log('No result');
      res.json({ exists: false });

    };

    if (username !== results.rows[0].username) {
      console.log('Username');
      res.json({ exists: false });

    };

    if (email !== results.rows[0].email) {
      console.log('Email');
      res.json({ exists: false });

    };

    // Compare the password provided with the password retrieved
    // Return compare's result

    let match = bcrypt.compare(password, results.rows[0].password);

    if (!match) {
      console.log('Password');
      res.json({ exists: false });

    };


    res.json({ exist: true });

  })
  .catch(() => {
    res.status(500).send();

  });



});

//Sharing Functions
/*
app.get('calendar', (req, res) => {
  const user_id = req.params.user_id;
  pool.query(`SELECT cal_name FROM calendars LEFT JOIN users WHERE user_id = ${user_id}`)
    .then(output => {
      res.send(output);
    });
})

app.get('/friends', (req, res) => {
  const user_id = req.params.user_id;
  pool.query(`SELECT friend_id FROM friends WHERE user_id = ${user_id}`)
    .then(output => {
      res.send(output);
    });
});

app.post('/friends', (req, res) => {
  const query = `INSERT INTO friends(user_id, friend_id) VALUES (${req.params.user_id}, ${req.params.friend_id})`;
  pool.query(query, (err, data) => {
  if (err) {
    console.log('err1: ', err);
    res.status(500).send(err);
  } else {
    query.push([friend_id]);
  }});

app.post('/share', (req, res) => {
    const query = `INSERT INTO user(user_id, friend_id) VALUES (${req.params.user_id}, ${req.params.friend_id})`;
    pool.query(query, (err, data) => {
    if (err) {
      console.log('err1: ', err);
      res.status(500).send(err);
    } else {
        query.characteristicReviewsValues.push([friend_id]);
    };
});*/

//END of Sharing Functions

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});