import { colorMap } from "../../../theme";

export const hexToRGBA = (hex: string) => {
  hex = hex.slice(1);
  var aRgbHex: any = hex.match(/.{1,2}/g);
  var aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16)
  ];
  return aRgb;
};

export const getToDoHours = (todo: any) => {
  let beginTime = Date.parse(todo.start_d);
  let endTime = Date.parse(todo.end_d);
  let todoTotal = endTime - beginTime;
  todoTotal = todoTotal / 1000;
  todoTotal = todoTotal / 60;
  todoTotal = todoTotal / 60;
  if (!Number.isInteger(todoTotal)) {
    todoTotal = +(todoTotal.toFixed(2));
  }
  return todoTotal;
}

export const buildWeekReportData = (weekTodos: any) => {
  let dayOfWeekData = [];
  let dataSetStorage: any = {};
  weekTodos.forEach((todo: any) => {
    let dayOfWeek = new Date(todo.start_d).getDay();
    let todoTotal = getToDoHours(todo);

    if (dataSetStorage[todo.category] === undefined) {
       let rgb = hexToRGBA(colorMap[todo.color]);
       dataSetStorage[todo.category] = {
         label: todo.category,
         data: [],
         backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
       }
       dataSetStorage[todo.category].data[dayOfWeek] = todoTotal;
     } else {
       if (dataSetStorage[todo.category].data[dayOfWeek]) {
         dataSetStorage[todo.category].data[dayOfWeek] += todoTotal;
       } else {
         dataSetStorage[todo.category].data[dayOfWeek] = todoTotal;
       }
     }
   });

   for (let cateegory in dataSetStorage) {
     let dataSetObj = dataSetStorage[cateegory];
     dayOfWeekData.push(dataSetObj);
   }

   return dayOfWeekData;
 }

 export const todoData = [
  {
    title: 'Study CS',
    start_d: '7/27/22 4:00',
    end_d: '7/27/22 8:22',
    category: 'School',
    color: '2'
  },
  {
    title: 'Training',
    start_d: '7/27/22 10:00',
    end_d: '7/27/22 18:22',
    category: 'Work',
    color: '1'
  },
  {
    title: 'Study Math',
    start_d: '7/25/22 4:00',
    end_d: '7/25/22 8:22',
    category: 'School',
    color: '2'
  },
  {
    title: 'Feature Update',
    start_d: '7/25/22 4:00',
    end_d: '7/25/22 12:00',
    category: 'Work',
    color: '1'
  },
  {
    title: 'Art',
    start_d: '7/25/22 12:00',
    end_d: '7/25/22 14:00',
    category: 'School',
    color: '2'
  },
  {
    title: 'Interview',
    start_d: '7/25/22 19:00',
    end_d: '7/25/22 20:00',
    category: 'Work',
    color: '1'
  },
  {
    title: 'Study History',
    start_d: '7/22/22 14:00',
    end_d: '7/22/22 16:00',
    category: 'School',
    color: '2'
  },
  {
    title: 'Clean Yard',
    start_d: '7/02/22 14:00',
    end_d: '7/02/22 16:00',
    category: 'Chores',
    color: '5'
  },
  {
    title: 'Mow Lawn',
    start_d: '7/02/22 14:00',
    end_d: '7/02/22 17:00',
    category: 'Chores',
    color: '5'
  },
  {
    title: 'Trim Bushes',
    start_d: '7/01/22 14:00',
    end_d: '7/01/22 20:00',
    category: 'Chores',
    color: '5'
  },{
    title: 'Do Dishes',
    start_d: '7/26/22 14:00',
    end_d: '7/26/22 15:00',
    category: 'Chores',
    color: '5'
  }
]