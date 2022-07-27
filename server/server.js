const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const {pool, darianPool} = require('../db/index.js'); //Hello
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

app.post('/signup', async (req, res) => {
  let { username, email, password } = req.body;

  let hash = await bcrypt.hash(password, 11);

  pool.query(`SELECT * FROM users WHERE email = '${email}' OR username = '${username}'`)
  .then((results) => {
    let query = results.rows[0];

    if (results.rows.length > 0) {
      query.email === email ? res.json({ created: false, reason: 'email' }) : res.json({ created: false, reason: 'username' });

    } else {

      pool.query(`INSERT INTO users (email, username, hashed_pass) VALUES ('${email}', '${username}', '${hash}')`)
      .then((result) => {
        res.json({ created: true });

      })
      .catch(() => {
        res.status(500).send();

      });

    }

  })
  .catch(() => {
    res.status(500).send();

  });

});

app.post('/login', (req, res) => {
  let { username, email, password } = req.body;

  pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
  .then((results) => {
    if (results.rows.length === 0) {
      res.json({ exists: false });

    };

    if (username !== results.rows[0].username) {
      res.json({ exists: false });

    };

    if (email !== results.rows[0].email) {
      res.json({ exists: false });

    };

    let match = bcrypt.compare(password, results.rows[0].password);

    if (!match) {
      res.json({ exists: false });

    };

    res.json({ exists: true });

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

//Unscheduled todo list
app.get('/unscheduledTodos/:userId', (req, res) => {
  const user_id = req.params.userId;
  console.log('user_id', user_id);
  const query = 'SELECT t.id, t.title, t.descript, c.color FROM todos t LEFT JOIN categories c ON t.cat_id = c.id WHERE t.user_id = ? AND t.complete = false'
  pool.query(query, [user_id], (err, data) => {
    if (err) {
      console.log('err to get all unscheduled todo list');
      res.status(500).send(err);
    } else {
      console.log('all unscheduled todo list', data);
      res.send(data);
    }
  })
});

app.get('/completedTodos/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = (
    `SELECT todos.title, todos.start_d, todos.end_d, categories.category_name, categories.color
    FROM todos
    INNER JOIN categories ON todos.cat_id=categories.id`
  );
  darianPool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(query, (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log(result.rows)
      res.send(result.rows)
    })
  })
});

app.post('/fakeCompletedTodo', (req, res) => {
  let body = req.body;
  console.log(body)
  let {user_id,cat_id,title,descript,start_d,end_d,all_d,complete, category_name, calendar_id, color} = req.body;
  const todoQuery = (
    `INSERT INTO todos(user_id,cat_id,title,descript,start_d,end_d,all_d,complete)
    values(
      ${user_id},
      ${cat_id},
      '${title}',
      '${descript}',
      '${start_d}',
      '${end_d}',
      ${all_d},
      ${complete}
    )`
  );

  const categoryQuery = (
    `INSERT INTO categories(category_name,calendar_id,color)
    values(
      '${category_name}',
      ${calendar_id},
      ${color}
    )`
  )

  darianPool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(todoQuery, (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log(result);
    })
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});