const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, '../build')));

app.post('/signup', (req, res) => {
  console.log('REQUEST', req.body);

  // EITHER

  // Do the signup stuff (encrypt password)
  // Then send info to database (Need to find out if there is a way to make sure there are no repeats in the User table)

  // OR

  // Query the database for the username
  // If it exists, send back that the username is taken
  // If it doesn't, do the signup stuff

  res.json(req.body);
});

app.post('/login', (req, res) => {
  console.log('REQUEST', req.body);

  // Request to database for username provided
    // Check for what a failed request returns

  // If username doesn't exist in database, return false

  // Compare the password provided with the password retrieved

  // Return compare's result

  res.json({exist: true});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});