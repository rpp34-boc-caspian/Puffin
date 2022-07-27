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

export const buildWeekReportData = (weekTodos: any) => {
  let dayOfWeekData = [];
  let dataSetStorage: any = {};
  weekTodos.forEach((todo: any) => {
    let beginTime = Date.parse(todo.start_date);
    let endTime = Date.parse(todo.end_date);
    let dayOfWeek = new Date(todo.start_date).getDay();
    let todoTotal = endTime - beginTime;
    todoTotal = todoTotal / 1000;
    todoTotal = todoTotal / 60;
    todoTotal = todoTotal / 60;

    if (dataSetStorage[todo.category] === undefined) {
       let rgb = hexToRGBA(colorMap[todo.color])
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
    start_date: '7/27/22 4:00',
    end_date: '7/27/22 8:22',
    complete: true,
    username: 'Jimmy Bo',
    category: 'School',
    color: '2'
  },
  {
    title: 'Training',
    start_date: '7/27/22 10:00',
    end_date: '7/27/22 18:22',
    complete: true,
    username: 'Jimmy Bo',
    category: 'Work',
    color: '1'
  },
  {
    title: 'Study Math',
    start_date: '7/25/22 4:00',
    end_date: '7/25/22 8:22',
    complete: true,
    username: 'Jimmy Bo',
    category: 'School',
    color: '2'
  },
  {
    title: 'Feature Update',
    start_date: '7/25/22 4:00',
    end_date: '7/25/22 12:00',
    complete: true,
    username: 'Jimmy Bo',
    category: 'Work',
    color: '1'
  },
  {
    title: 'Art',
    start_date: '7/25/22 12:00',
    end_date: '7/25/22 14:00',
    complete: true,
    username: 'Jimmy Bo',
    category: 'School',
    color: '2'
  },
  {
    title: 'Interview',
    start_date: '7/25/22 19:00',
    end_date: '7/25/22 20:00',
    complete: true,
    username: 'Jimmy Bo',
    category: 'Work',
    color: '1'
  },
  {
    title: 'Study History',
    start_date: '7/22/22 14:00',
    end_date: '7/22/22 16:00',
    complete: true,
    username: 'Jimmy Bo',
    category: 'School',
    color: '2'
  }
]