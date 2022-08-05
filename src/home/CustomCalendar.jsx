
import React, { useState } from 'react';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Menu, { Item as MenuItem } from 'rc-menu';


const sharedCalendarMock = ['Tam','School','Holidays']


const CustomCalendar = (props) => {
  console.log('from Custom Calendar :', props)
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
      console.log(currentSelect)
    } else {
      let indexDelete = prevArr.indexOf(user.name)
      console.log(`the user ${user.name} needs to be removed from view/array ${indexDelete}`)
      // remove the name at the indexDelete
      // setCurrentSelect(array without indexDelete)
    }
  }

  function onSelect({ key }) {
    console.log(`${key} selected`);
  }

  function onVisibleChange(visible) {
    console.log(visible);
  }

  // const menu = (
  //   <Menu onSelect={onSelect}>
  //     {
  //       myCalendarMock.map((item, i) => {
  //         return <MenuItem key={i}>
  //           {item}
  //           <input
  //             type="checkbox"
  //             name={item}
  //             onChange={(e) => {
  //               handleViewSelect(e);
  //             }}/>
  //         </MenuItem>
  //       })
  //     }
  //   </Menu>
  // );

  const sharedCalendarMenu = (
    <Menu onSelect={onSelect}>
      {
        sharedCalendarMock.map((item, i) => {
          return <MenuItem key={i}>{item}<input type="checkbox" name={item} onChange={handleViewSelect}/></MenuItem>
        })
      }
    </Menu>
  );


   // input checkbox (create event handler for each)
  return (

    <div className='rbc-toolbar'>
      {/* <div className="myCalendarView" style={{ padding: 5}}>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        animation="slide-up"
        onVisibleChange={onVisibleChange}
      >
        <button style={{ width: 125 }}>My Calendars</button>
      </Dropdown>
      </div> */}
      <div className="sharedCalendarView" style={{ padding: 5 }}>
      <Dropdown
        trigger={['click']}
        overlay={sharedCalendarMenu}
        animation="slide-up"
        onVisibleChange={onVisibleChange}
      >
        <button style={{ width: 150 }}>Shared Calendars</button>
      </Dropdown>
      </div>
    </div>
  )
}

export default CustomCalendar;


