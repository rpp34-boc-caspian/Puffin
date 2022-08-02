import React from 'react';

import { ToDo } from "./Todo";

export const CreateTodo = ({ calendarId = 1 }) =>
    <ToDo
        initTitle={""}
        initDescription={""}
        initStart={null}
        initEnd={null}
        initAllDay={false}
        initSelectedCategory={""}
        calendarId={calendarId}
        mode={'Add'}
    />