
import React, { useState } from 'react';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Menu, { Item as MenuItem } from 'rc-menu';


const FilterMenu = ({listOfCategories, listOfFriends}) => {

  const [currentSelect, setCurrentSelect] = useState([]);

  const handleViewSelect = (event) => {
    let user = {
      name: event.target.name,
      isChecked: event.target.checked
    }

    console.log(`the ${user.name} was checked: ${user.isChecked}`)

    let userIsChecked = user.isChecked
    let prevArr = currentSelect;

    if (userIsChecked) {
      prevArr.push(user.name)
      setCurrentSelect(prevArr);
    } else {
      console.log(`the user ${user.name} needs to be removed from view/array`)
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
          return <MenuItem key={i}>{item}<input type="checkbox" name={item} onChange={handleViewSelect}/></MenuItem>
        })
      }
    </Menu>
  );

  const categoriesMenu = (
    <Menu onSelect={onSelect}>
      {
        listOfCategories.map((item, i) => {
          return <MenuItem key={i}>{item}<input type="checkbox" name={item} onChange={handleViewSelect}/></MenuItem>
        })
      }
    </Menu>
  );


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
      <div className="categoriesView" style={{ padding: 5 }}>
      <Dropdown
        trigger={['click']}
        overlay={categoriesMenu}
        animation="slide-up"
        onVisibleChange={onVisibleChange}>
        <button style={{ width: 150 }}>My Categories</button>
      </Dropdown>
      </div>
    </div>
  )
}

export default FilterMenu;


