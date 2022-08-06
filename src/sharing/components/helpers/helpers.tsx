import { DataArray } from "@mui/icons-material";

interface friend {
  name: string,
  permissions: number
}

interface user {
  userId: number,
  calendar: string,
  categories: category[],
  friends: string[]
}

interface category {
  name: string,
  cat_id: number,
  todos: todo[],
  color: number
}

interface todo {
  name: string,
  cat_id: number,
  todo_id: number
}

export const formatData = (rows: any) => {
  const no_cat: category[] = [];
  const empty: string[] = [];
  const user: user = {
    userId: -1,
    calendar: '',
    categories: no_cat,
    friends: empty
  };

  if (rows !== undefined) {

    for (var i = 0; i < rows.length; i++) {
      var isFound = false;
      if (user.userId === -1) {
        user.userId = rows[i].cal_id;
      }
      if (user.calendar === '') {
        user.calendar = rows[i].cal_name;
      }
      for (var j = 0; j < user.categories.length; j++) {
        if (user.categories[j].name === rows[i].category_name) {
          user.categories[j].todos.push({
            name: rows[i].title,
            cat_id: rows[i].cat_id,
            todo_id: rows[i].todo_id
          });
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        user.categories.push({
          name: rows[i].category_name,
          cat_id: rows[i].cat_id,
          todos: [{
            name: rows[i].title,
            cat_id: rows[i].cat_id,
            todo_id: rows[i].todo_id
          }],
          color: rows[i].color
        });
      }
    }
  }

  return user;
};

export const catClean = (rows: any) => {
  const categories: any = {};
  if (rows !== undefined) {
    for (var i = 0; i < rows.length; i++) {
      categories[rows[i].cat_id] = false;
    }
  }
  return categories;
  // const categories : any = {};
  // for (var i = 0; i < rows.length; i++) {
  //   categories[rows[i].cat_id] = {
  //     state: false,
  //     todos: {}
  //   }
  //   categories[rows[i].cat_id].todos[rows[i].title] = false;
  // }
  // return categories;
}

export const todoClean = (rows: any) => {
  const todos: any = {};
  if (rows !== undefined) {
    for (var i = 0; i < rows.length; i++) {
      todos[rows[i].todo_id] = false;
    }
  }

  return todos;
}

export const catData = (data: any) => {
  const catD: any = {};
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].todos.length; j++) {
      if (!catD[data[i].cat_id]) {
        catD[data[i].cat_id] = [data[i].todos[j].todo_id];
      } else {
        catD[data[i].cat_id].push(data[i].todos[j].todo_id);
      }
    }
  }

  return catD;
}

export const cleanAccess = (data: any) => {
  const access: any = {};
  if (data !== undefined) {
    for (var i = 0; i < data.length; i++) {
      access[data[i].friend_id] = 0;
    }
  }

  return access;
}

export const parseUsers = (data: any) => {
  const users: any = {};
  if (data !== undefined) {
    for (var i = 0; i < data.length; i++) {
      users[data[i].email] = data[i].id;
    }
  }
  return users;
}


export const userEx =
{
  userId: -1,
  calendar: 'Mandy Cal',
  categories: [
    {
      name: 'Eat',
      cat_id: -1,
      todos: [
        {
          name: 'Cheese',
          cat_id: -1,
          todo_id: -1
        }
      ],
      color: 4
    },
    {
      name: 'Sport',
      cat_id: -2,
      todos: [
        {
          name: 'Football',
          cat_id: -2,
          todo_id: -2
        }
      ],
      color: 9
    },
  ],

  friends: ['Tim', 'Sarah', 'Mandy', 'Luna', 'Joshua', 'Michael', 'Martin', 'Luke']
}