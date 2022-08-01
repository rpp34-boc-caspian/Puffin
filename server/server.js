const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors');
const {pool, darianPool} = require('../db/index.js');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(cors())

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

app.get('/share/user_profile/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = `SELECT calendars.cal_name, categories.category_name, categories.color, todos.title from calendars left join categories on calendars.id = categories.calendar_id LEFT JOIN todos
  ON categories.id = todos.cat_id where calendars.user_id = ${user_id};`;
  pool.connect((err, client, release) => {
    client.query(query, (err, result) => {
      release();
      console.log(result.rows)
      res.send(result.rows)
    })
  })
});

app.get('/share_todos_info/:userId', (req, res) => {
  const user_id = req.params.userId;
  pool.query(`SELECT calendars.user_id, calendars.cal_name, categories.category_name, categories.color, todos.title, users.username
  AS friend , permissions.permission FROM calendars LEFT JOIN categories ON calendars.id = categories.calendar_id LEFT JOIN todos
  ON categories.id = todos.cat_id LEFT JOIN permissions ON permissions.user_id = calendars.user_id LEFT JOIN users
  ON permissions.friend_id = users.id WHERE calendars.user_id = ${user_id}`)
    .then(output => {
      res.send(output);
    })
    .catch(err => {
      res.status(500).send(err);
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

//Unscheduled todo list
app.get('/unscheduledTodos/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = 'SELECT t.id, t.title, t.descript, t.complete, c.color FROM todos t LEFT JOIN categories c ON t.cat_id = c.id WHERE t.user_id = $1 AND t.complete = false;'
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
      console.log('complete', complete);
      if (complete) {
        return pool.query(updateFalseQuery, [todo_id])
      } else {
        return pool.query(updateTrueQuery, [todo_id])
      }
    })
    .then(({ rowCount }) => {
      if (rowCount > 0) {
        res.status(204).json({ status: "updated" });
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
      res.status(204).json({status:"deleted"});
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})