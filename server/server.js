const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, '../build')));

app.post('signup', (req, res) => {
  console.log('REQUEST', req.body);
  res.json(req.body);


});

app.post('/login', (req, res) => {
  console.log('REQUEST', req.body);
  res.json(req.body);


});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});