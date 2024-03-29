const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors');
const {pool, tamPool} = require('../db/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(cookieParser());

app.use(cors())

// https://create-react-app.dev/docs/proxying-api-requests-in-development/
app.post('/api/createtodo', (req, res) => {
  const {
    title,
    userId,
    selectedCategory,
    description,
    start,
    end,
    allDay
  } = req.body;

  pool.connect((err, client, release) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    client.query(`INSERT INTO todos
      (title, user_id, cat_id, descript, start_d, end_d, all_d, complete)
      VALUES ('${title}', ${userId}, 1, '${description}', to_timestamp(${new Date(start).getTime() / 1000}), to_timestamp(${new Date(end).getTime() / 1000}), ${allDay}, false)
    `,
    (err, result) => {
      release();
      if (err) {
        res.status(500).json({ err });
        return;
      }

      res.status(200).json({ todos: result.rows });
    })
  })
})

app.post('/api/updatetodo', (req, res) => {
  const {
    id,
    title,
    selectedCategory,
    description,
    start,
    end,
    allDay
  } = req.body;
  // console.log(req.body)

  pool.connect((err, client, release) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    client.query(`UPDATE todos
      SET title='${title}',
       cat_id=${selectedCategory},
       descript='${description}',
       start_d=to_timestamp(${new Date(start).getTime() / 1000}),
       end_d=to_timestamp(${new Date(end).getTime() / 1000 }),
       all_d=${allDay}
       where id=${id}
    `,
    (err, result) => {
      release();
      if (err) {
        console.log(err)
        res.status(500).json({ err });
        return;
      }

      res.status(200).json({ todos: result.rows });
    })
  })
})

app.get('/api/getcategories', (req, res) => {
  const { calendarId } = req.query;

  pool.connect((err, client, release) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    client.query(`SELECT * from categories where calendar_id = ${calendarId}`,
    (err, result) => {
      release();
      if (err) {
        res.status(500).json({ err });
        return;
      }

      res.status(200).json({ categories: result.rows });
    })
  })
})

app.get('/api/get_todo', (req, res) => {
  const { todo } = req.query;

  pool.connect((err, client, release) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    client.query(`SELECT * from todos where id=${parseInt(todo)}`,
    (err, result) => {
      release();
      if (err) {
        res.status(500).json({ err });
        return;
      }
      res.status(200).json({ todo: result.rows[0] });
    })
  })
})

app.post('/api/createcategory', (req, res) => {
  const {
    name,
    color,
    calendarId
  } = req.body;

  pool.connect((err, client, release) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    client.query(`INSERT INTO categories
      (category_name, color, calendar_id)
      VALUES ('${name}', ${color}, ${calendarId})
    `,
    (err, result) => {

      if (err) {
        console.log(err)
        res.status(500).json({ err });
        return;
      }
      client.query(`SELECT * from categories where calendar_id = ${calendarId}`,
      (err, result) => {
        release();
        if (err) {
          res.status(500).json({ err });
          return;
        }

        res.status(200).json({ categories: result.rows });
      })
    })
  })
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
          .catch((err) => {
            console.log(err);
            res.status(500).send();

          });

          pool.query(`SELECT * FROM users WHERE username = '${username}'`)
            .then((result) => {
              let token = jwt.sign({ id: result.rows[0].id, user: username }, 'teamPuffin');

              res.json({ created: true, id: result.rows[0].id, cookie: token });

            })
            .catch((err) => {
              console.log(err);
              res.status(500).send();

            });

      }

    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();

    });

});

app.post('/login', async (req, res) => {
  let { username, email, password } = req.body;
  let test = await bcrypt.hash('xinxin4', 11);
  console.log({test})
  pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
  .then( async (results) => {
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

    res.json({ exists: true, id: results.rows[0].id, cookie: token });

  })
  .catch((err) => {
    console.log(err);
    res.status(500).send();

    });

});
//Sharing Functions

app.get('/share/user_profile/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = `SELECT calendars.cal_name, calendars.id as cal_id, categories.category_name, categories.id as cat_id, categories.color, todos.id as todo_id, todos.title from calendars left join categories on calendars.id = categories.calendar_id LEFT JOIN todos
  ON categories.id = todos.cat_id where calendars.user_id = ${user_id};`;
  pool.connect((err, client, release) => {
    client.query(query, (err, result) => {
      release();
      res.send(result.rows)
    })
  })
});

app.get('/share/todos_info/:userId', (req, res) => {
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

app.get('/share/friends/:userId', (req, res) => {
  const user_id = req.params.userId;
  pool.query(`select friends.friend_id, users.username, users.email from friends join users on friend_id = users.id where friends.user_id = ${user_id}`)
    .then(output => {
      res.send(output);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get('/share/users', (req, res) => {
  const query = `select id, username, email from users`;
  pool.connect((err, client, release) => {
    client.query(query, (err, result) => {
      release();
      res.send(result.rows);
    })
  })
});

app.get('/share/perm/:userId/:friend_id/:todo_id', (req, res) => {
  const user_id = req.params.userId;
  const friend_id = req.params.friend_id;
  const todo_id = req.params.todo_id;
  const query = `select * from permissions where user_id=${user_id} and friend_id=${friend_id} and todo_id=${todo_id};`;
  pool.connect((err, client, release) => {
    client.query(query, (err, result) => {
      release();
      res.send(result.rows);
    })
  })
});


app.post('/share/permissions/:userId/', (req, res) => {
  const user_id = req.params.userId;
  const {friend_id, cal_share, cat_id, cat_share, todo_id, permission} = req.body;
  const query = `insert INTO permissions(user_id, friend_id, cal_share, cat_id, cat_share, todo_id, permission) VALUES (${user_id}, ${friend_id}, ${cal_share}, ${cat_id}, ${cat_share}, ${todo_id}, ${permission});`;
  pool.connect((err, client, release) => {
    client.query(query, (err, result) => {
      release();
      res.send(result.rows)
    })
  })
});

  app.put('/share/permissions/:userId', (req, res) => {
    const user_id = req.params.userId;
    const {friend_id, cal_share, cat_id, cat_share, todo_id, permission} = req.body;
    const query = `UPDATE permissions SET cal_share=${cal_share}, cat_id=${cat_id}, cat_share=${cat_share}, permission=${permission} where user_id=${user_id} and friend_id=${friend_id} and todo_id=${todo_id};`;
    pool.connect((err, client, release) => {
      client.query(query, (err, result) => {
        release();
        res.send(result.rows)
      })
    })
  });

    //END of Sharing Functions

//todo list
app.get('/todos/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = 'SELECT t.id, t.user_id, t.cat_id, t.title, t.descript, t.start_d as start, t.end_d as end, t.all_d as allday, t.complete, c.color, c.category_name as category, p.permission from todos t LEFT JOIN categories c ON t.cat_id = c.id LEFT JOIN permissions p ON p.todo_id = t.id WHERE t.user_id = $1 AND t.complete = false AND t.start_d IS NOT NULL AND t.end_d IS NOT NULL;'
  pool.query(query, [user_id])
    .then(({ rows }) => {
      // console.log('rows to get all todos in server', rows);
      res.send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})


app.put('/todos/:todoId', (req, res) => {
  const todo_id = req.params.todoId;
  const {start, end, allday, complete} = req.body;
  console.log(req.body, 'complete', complete);
  const updateCompleteQuery = 'UPDATE todos SET complete = $1 WHERE id = $2';
  const updateCompleteOptions = [complete, todo_id];
  const updateTiemQuery = 'UPDATE todos SET start_d = $1, end_d = $2, all_d = $3 WHERE id = $4';
  const updateTimeOptions = [new Date(start), new Date(end), allday, todo_id]
  const updateComplete = () => pool.query(updateCompleteQuery, updateCompleteOptions);
  const updateTime = () => pool.query(updateTiemQuery, updateTimeOptions);
  const query = complete !== undefined ? updateComplete() : updateTime();

  query
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

app.delete('/todos/:todoId', (req, res) => {
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

app.get('/completedTodos/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = (
    `SELECT todos.id, todos.title, todos.start_d, todos.end_d, categories.category_name, categories.color
    FROM todos
    INNER JOIN categories ON todos.cat_id=categories.id
    WHERE user_id=${user_id} AND complete=true`
  );
  pool.connect((err, client, release) => {
    if (err) {
      res.sendStatus(500);
      console.error('Error acquiring client', err.stack);
    }
    client.query(query, (err, result) => {
      release();
      if (err) {
        res.sendStatus(500);
        console.error('Error executing query', err.stack);
      }
      res.send(result.rows)
    })
  })
});


//friends todo list


  //  const query = 'SELECT t.id, t.user_id, t.cat_id, t.title, t.descript, t.start_d as start, t.end_d as end, t.all_d as allday, t.complete, c.color, c.category_name as category, p.permission from todos t LEFT JOIN categories c ON t.cat_id = c.id LEFT JOIN permissions p ON p.todo_id = t.id WHERE t.user_id = $1 AND t.complete = false AND t.start_d IS NOT NULL AND t.end_d IS NOT NULL;'
  // --> some edits to use as update here- but can we also return the author of the todo??? :  const query = (`select users.id, users.username, users.email, permissions.user_id as shared_user_id, permissions.friend_id, permissions.cal_share, permissions.cat_id, permissions.cat_share, permissions.todo_id, permissions.permission, categories.*, todos.id, todos.user_id, todos.cat_id, todos.title, todos.descript, todos.start_d as start, todos.end_d as end, todos.all_d as allday, todos.complete, from users left join permissions on users.id = permissions.friend_id left join categories on permissions.cat_id = categories.id left join todos on permissions.todo_id = todos.id  where users.id = ${user_id};`)


app.get('/friendsTodos/:userId', (req, res) => {
  const user_id = req.params.userId;
  const query = (`select users.id, users.username, users.email, permissions.user_id as shared_user_id, permissions.friend_id, permissions.cal_share, permissions.cat_id, permissions.cat_share, permissions.todo_id, permissions.permission, categories.*, todos.* from users left join permissions on users.id = permissions.friend_id left join categories on permissions.cat_id = categories.id left join todos on permissions.todo_id = todos.id  where users.id = ${user_id};`)

  pool.query(query)
    .then(({ rows }) => {
      console.log('FRIENDS TODOS HERE!', rows, 'END');
      res.send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  });




app.put('/updateTodoTime/', (req, res) => {
  const {id, end_d, start_d, user_id} = req.body;
  const query = (
    `UPDATE todos
     SET end_d='${end_d}', start_d='${start_d}'
     WHERE id=${id}`
  );

  pool.connect((err, client, release) => {
    if (err) {
      res.sendStatus(500);
      console.error('Error acquiring client', err.stack);
    }
    client.query(query, (err, result) => {
      release();
      if (err) {
        console.error('Error executing query', err.stack);
        res.sendStatus(500);
      } else {
        axios.get(`http://127.0.0.1:8080/completedTodos/${user_id}`)
          .then((data) => {
            res.send(data.data)
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500);
          })

      }
    })
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})