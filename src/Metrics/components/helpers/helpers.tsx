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

    if (dataSetStorage[todo.category_name] === undefined) {
       let rgb = hexToRGBA(colorMap[todo.color]);
       dataSetStorage[todo.category_name] = {
         label: todo.category_name,
         data: [],
         backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
       }
       dataSetStorage[todo.category_name].data[dayOfWeek] = todoTotal;
     } else {
       if (dataSetStorage[todo.category_name].data[dayOfWeek]) {
         dataSetStorage[todo.category_name].data[dayOfWeek] += todoTotal;
       } else {
         dataSetStorage[todo.category_name].data[dayOfWeek] = todoTotal;
       }
     }
   });

   for (let category in dataSetStorage) {
     let dataSetObj = dataSetStorage[category];
     dayOfWeekData.push(dataSetObj);
   }

   return dayOfWeekData;
 }

 export const FakeTodoData = [
  {
    title: 'Paint House',
    start_d: '2022-08-01T15:00:00.000Z',
    end_d: '2022-08-01T18:00:00.000Z',
    category_name: 'Chores',
    color: 8
  },
  {
    title: 'Mow Lawn',
    start_d: '2022-08-06T16:00:00.000Z',
    end_d: '2022-08-06T17:00:00.000Z',
    category_name: 'Chores',
    color: 8
  },
  {
    title: 'Clean Dishes Again',
    start_d: '2022-08-05T14:00:00.000Z',
    end_d: '2022-08-05T16:00:00.000Z',
    category_name: 'Chores',
    color: 8
  },
  {
    title: 'Clean Gutters',
    start_d: '2022-08-06T14:00:00.000Z',
    end_d: '2022-08-06T16:00:00.000Z',
    category_name: 'Chores',
    color: 8
  },
  {
    title: 'Clean Garage',
    start_d: '2022-08-02T14:00:00.000Z',
    end_d: '2022-08-02T16:00:00.000Z',
    category_name: 'Chores',
    color: 8
  },
  {
    title: 'Clean Room',
    start_d: '2022-08-06T14:00:00.000Z',
    end_d: '2022-08-06T16:00:00.000Z',
    category_name: 'Chores',
    color: 8
  },
  {
    title: 'Clean Dishes',
    start_d: '2022-08-06T14:00:00.000Z',
    end_d: '2022-08-06T16:00:00.000Z',
    category_name: 'Chores',
    color: 8
  },
  {
    title: 'Feautre Update 123.0',
    start_d: '2022-08-01T14:00:00.000Z',
    end_d: '2022-08-01T20:00:00.000Z',
    category_name: 'Work',
    color: 3
  },
  {
    title: 'Client Meeting (Janet)',
    start_d: '2022-08-01T14:00:00.000Z',
    end_d: '2022-08-01T16:00:00.000Z',
    category_name: 'Work',
    color: 3
  },
  {
    title: 'Client Meeting (Peter)',
    start_d: '2022-08-02T14:00:00.000Z',
    end_d: '2022-08-02T16:00:00.000Z',
    category_name: 'Work',
    color: 3
  },
  {
    title: 'Client Meeting (Leah)',
    start_d: '2022-08-04T14:00:00.000Z',
    end_d: '2022-08-04T17:00:00.000Z',
    category_name: 'Work',
    color: 3
  },
  {
    title: 'Client Meeting (Jim)',
    start_d: '2022-08-05T14:00:00.000Z',
    end_d: '2022-08-05T16:00:00.000Z',
    category_name: 'Work',
    color: 3
  },
  {
    title: 'Interview',
    start_d: '2022-08-01T13:00:00.000Z',
    end_d: '2022-08-01T15:00:00.000Z',
    category_name: 'Work',
    color: 3
  }
]