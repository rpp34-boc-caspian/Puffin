const express = require('express');
var bodyParser = require('body-parser')

const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors');
const {pool, darianPool} = require('../db/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(cookieParser());

app.use(cors())

// https://create-react-app.dev/docs/proxying-api-requests-in-development/
app.post('/api/createtodo', (req, res) => {
  const { title, description } = req.body;
  console.log(req.body)

  res.json({ data: 'hello' })
})

app.get('/verify/:token', (req, res) => {
  let tokenResults = jwt.verify(req.params.token, 'teamPuffin');

  pool.query(`SELECT * FROM users WHERE id = ${tokenResults.id}`)
  .then((results) => {
    if (results.rows[0].username === tokenResults.user) {
      tokenResults['correct'] = true;
      return res.json(tokenResults);

    }

    tokenResults['correct'] = false;

    res.json(tokenResults);

  })
  .catch(() => {
    res.status(500).json({ correct: false });

  });

});

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

app.post('/login', async (req, res) => {
  let { username, email, password } = req.body;
  let test = await bcrypt.hash('$2b$11$3njt9daouraEufrFObd4vOY6Y3qHobGYrFOW1eJG0P5i4fS7Q.W36', 11);
  console.log({test})
  let testMatach = await bcrypt.compare('darian3', '$2b$11$3njt9daouraEufrFObd4vOY6Y3qHobGYrFOW1eJG0P5i4fS7Q.W36');
  console.log({testMatach})
  pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
  .then( async (results) => {
    console.log('RESULTS:', results.rows)
    if (results.rows.length === 0) {
      res.json({ exists: false });

      };

      if (username !== results.rows[0].username) {
        res.json({ exists: false });

      };

      if (email !== results.rows[0].email) {
        res.json({ exists: false });

      };

    let match = await bcrypt.compare(password, results.rows[0].hashed_pass);

      if (!match) {
        res.json({ exists: false });

      };

    let token = jwt.sign({ id: results.rows[0].id, user: username }, 'teamPuffin');
    console.log({token})

    res.json({ exists: true, id: results.rows[0].id, cookie: token });

  })
  .catch((err) => {
    console.log(err);
    res.status(500).send();

    });

});
//Sharing Functions

app.get('calendar_todos', (req, res) => {
  const user_id = req.params.user_id;
  pool.query(`SELECT cal_name FROM calendars WHERE user_id = ${user_id}`)
    .then(output => {
      res.send(output);
    });
});

app.get('/share_todos_info', (req, res) => {
  const user_id = req.params.user_id;
  pool.query(`SELECT calendars.user_id, calendars.cal_name, categories.category_name, categories.color, todos.title, users.username AS friend , permissions.permission FROM calendars LEFT JOIN categories ON calendars.user_id = categories.calendar_id LEFT JOIN todos ON categories.id = todos.cat_id LEFT JOIN permissions ON permissions.user_id = calendars.user_id LEFT JOIN users ON permissions.friend_id = users.id WHERE calendars.user_id = ${user_id}`)
    .then(output => {
      res.send(output);
    });
});

/*
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

//todo list
app.get('/todos/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = 'SELECT t.*, c.color from todos t LEFT JOIN categories c ON t.cat_id = c.id WHERE t.user_id = $1 AND t.complete = false AND t.start_d IS NOT NULL AND t.end_d IS NOT NULL;'
  pool.query(query, [user_id])
    .then(({ rows }) => {
      console.log('rows to get all todos in server', rows);
      res.send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

//Unscheduled todo list
app.get('/unscheduledTodos/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = 'SELECT t.id, t.title, t.complete, c.color FROM todos t LEFT JOIN categories c ON t.cat_id = c.id WHERE t.user_id = $1 AND t.complete = false AND t.start_d IS NULL AND t.end_d IS NULL;'
  pool.query(query, [user_id])
    .then(({ rows }) => {
      res.send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

app.put('/unscheduledTodos/:todoId', (req, res) => {
  const todo_id = req.params.todoId;
  const searchQuery = 'SELECT t.complete FROM todos t WHERE id = $1';
  const updateTrueQuery = 'UPDATE todos SET complete = true WHERE id = $1';
  const updateFalseQuery = 'UPDATE todos SET complete = false WHERE id = $1';
  pool.query(searchQuery, [todo_id])
    .then(({ rows }) => {
      return rows[0].complete;
    })
    .then(complete => {
      if (complete) {
        return pool.query(updateFalseQuery, [todo_id])
      } else {
        return pool.query(updateTrueQuery, [todo_id])
      }
    })
    .then(({rowCount}) => {
      if (rowCount > 0) {
        res.json({ message: 'updated' });
      }
    })
    .catch(err => {
      console.log('err', err);
      res.status(500).send(err);
    })
})

app.delete('/unscheduledTodos/:todoId', (req, res) => {
  const todo_id = req.params.todoId;
  const query = 'DELETE FROM todos WHERE id = $1;';
  pool.query(query, [todo_id])
  .then(({rowCount}) => {
    if (rowCount > 0) {
      res.json({ message: 'deleted' });
    }
  })
  .catch(err => {
    console.log('err', err);
    res.status(500).send(err);
  })
});

app.get('/completedTodos/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = (
    `SELECT todos.title, todos.start_d, todos.end_d, categories.category_name, categories.color
    FROM todos
    INNER JOIN categories ON todos.cat_id=categories.id
    WHERE user_id=${user_id} AND complete=true`
  );
  pool.connect((err, client, release) => {
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
