
import React, { useState } from 'react';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Menu, { Item as MenuItem } from 'rc-menu';


const FilterMenu = ({setMyTodos, myTodos, friendsTodos}) => {
  const [currentSelect, setCurrentSelect] = useState([]);

  console.log(myTodos);

  let friendsUserId = {
    1: 'Tam',
    2: 'Jane',
    3: 'Darian',
    4: 'Xinxin',
    5: 'Keegan',
    6: 'Cornie'
  }

  let form = (toDo) => {
    let newObject = {
      allday: toDo.all_d,
      color: toDo.color,
      complete: toDo.complete,
      descript: toDo.descript,
      end: toDo.end_d,
      id: toDo.todo_id,
      permission: toDo.permission,
      start: toDo.start_d,
      title: toDo.title,
      author: friendsUserId[toDo.user_id],
      category: toDo.category_name,
      username: toDo.username
    }
    return newObject
  }

  let formedFriendsToDo = friendsTodos.map(form);

  let allTodos = [...formedFriendsToDo, ...myTodos];

  let friends = formedFriendsToDo.filter((eachTodo) =>
    eachTodo.author !== eachTodo.username
  )

  const listOfFriends = [...new Set(friends.map((item) => item.author))];
  // const listOfCategories = [...new Set(allTodos.map((todo) => todo.category))];


  const handleViewSelect = (event) => {
    let user = {
      name: event.target.name,
      isChecked: event.target.checked,
      type: event.target.id
    }

    let userIsChecked = user.isChecked
    let userNameTodos = allTodos.filter((item) => item.author === user.name)
    // let categoryTodos = allTodos.filter((item) => item.category === user.name)

    // let categoryTodos = allTodos.filter((item) => item.category === user.name)

    // need to separate events-
    //   first dropdown to pull todos based on author and
    //   second dropdown to pull todos based on category
    // right now event.target.name represents both friend and category

    let prevArr = currentSelect;

    if (userIsChecked) {
      if (user.type === 'friend' && currentSelect.indexOf(user.name) < 0) {
        prevArr.push(user.name)
        setCurrentSelect(prevArr);
        setMyTodos([...myTodos, ...userNameTodos])
      } else {
        return;
      }
      // if (user.type === 'category' && currentSelect.indexOf(user.category) < 0) {
      //   prevArr.push(user.category)
      //   setCurrentSelect(prevArr);
      //   setMyTodos([...myTodos, ...categoryTodos])
      // }
    }
    else {
      prevArr = prevArr.filter(todo => todo !== user.name);
      setCurrentSelect(prevArr)
      myTodos = myTodos.filter(todo => todo.author !== user.name);
      setMyTodos(myTodos)
    }
  }

  function onSelect({ key }) {
  }

  function onVisibleChange(visible) {
  }

  const friendsMenu = (
    <Menu onSelect={onSelect}>
      {
        listOfFriends.map((item, i) => {
          return <MenuItem key={i}>{item}<input id="friend" type="checkbox" name={item} onChange={handleViewSelect}/></MenuItem>
        })
      }
    </Menu>
  );

  // const categoriesMenu = (
  //   <Menu onSelect={onSelect}>
  //     {
  //       listOfCategories.map((item, i) => {
  //         return <MenuItem key={i}>{item}<input id="category" type="checkbox" name={item} onChange={handleViewSelect}/></MenuItem>
  //       })
  //     }
  //   </Menu>
  // );


  return (

    <div className='rbc-toolbar'>
      <div className="friendsView" style={{ padding: 5 }}>
      <Dropdown
        trigger={['click']}
        overlay={friendsMenu}
        animation="slide-up"
        onVisibleChange={onVisibleChange}>
        <button style={{ width: 150 }}>My Friends</button>
      </Dropdown>
      </div>
      {/* <div className="categoriesView" style={{ padding: 5 }}>
      <Dropdown
        trigger={['click']}
        overlay={categoriesMenu}
        animation="slide-up"
        onVisibleChange={onVisibleChange}>
        <button style={{ width: 150 }}>My Categories</button>
      </Dropdown>
      </div> */}
    </div>
  )
}

export default FilterMenu;


