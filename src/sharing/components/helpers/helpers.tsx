interface friend {
  name: string,
  permissions: number
}

interface user {
  calendar: string,
  categories: category[],
  friends: string[]
}

interface category {
  name: string,
  todos: string[],
  color: number
}

export const formatData = (rows: any) => {
  const no_cat : category[] = [];
  const empty : string[] = [];
  const user: user = {
    calendar: '',
    categories: no_cat,
    friends: empty
  };

  for (var i = 0; i < rows.length; i++) {
    var isFound = false;
    if (user.calendar === '') {
      user.calendar = rows[i].cal_name;
    }
    for (var j = 0; j < user.categories.length; j++) {
      if (user.categories[j].name === rows[i].category_name) {
        user.categories[j].todos.push(rows[i].title);
        isFound = true;
        break;
      }
    }
    if (!isFound) {

      user.categories.push({
        name: rows[i].category_name,
        todos: rows[i].title === null ? empty : [rows[i].title],
        color: rows[i].color
      });
    }
  }

  return user;
};

export const userEx =
  {
    calendar: 'Mandy Cal',
    categories: [
      {
        name: 'Eat',
        todos: [
          'Broccoli',
          'Cheese'
        ],
        color: 4
      },
      {
        name: 'Study',
        todos: [],
        color: 2
      },
      {
        name: 'Sport',
        todos: [
            'Tennis',
            'Basketball',
            'Football',
            'American Football'
        ],
        color: 9
      },
    ],

    friends: ['Tim', 'Sarah', 'Mandy', 'Luna', 'Joshua', 'Michael', 'Martin', 'Luke']
  }