import React from 'react';
import { useParams } from "react-router-dom";

import { ToDo } from './Todo';

interface TODO {
    id: number;
    title: string;
    descript: string;
    start_d: null | Date;
    end_d: null | Date;
    all_d: boolean;
    cat_id: string;
    calendarId: number;
}

export const UpdateTodo = () => {
    const { todoId } = useParams();
    const [todo, setTodo] = React.useState<TODO | null>(null);

    React.useEffect(() => {
        if (todoId) {
            fetch(`/api/get_todo?todo=${todoId}`, {
                method: "GET",
            })
                .then((resp) => resp.json())
                .then(({ todo }) => {
                    console.log(todo)
                    setTodo(todo);
                })
                .catch(err => console.error(err));
        }

    }, [todoId])

    return todo && <ToDo
        id={todo.id}
        initTitle={todo.title}
        initDescription={todo.descript}
        initStart={todo.start_d}
        initEnd={todo.end_d}
        initAllDay={todo.all_d}
        initSelectedCategory={todo.cat_id}
        calendarId={todo.calendarId}
        mode={'Edit'}
    />;
}
