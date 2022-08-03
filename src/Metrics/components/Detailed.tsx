import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { CategoryDetailed } from "./CatergoryDetailed";

interface userTodo {
  title: string,
  start_d: string,
  end_d: string,
  category_name: string,
  color: number,
  id: number
}
interface allTodos {
  todos: userTodo[],
  totalHours: number,
  categoryHours: any,
  togglePage: React.Dispatch<React.SetStateAction<{
    home: boolean;
    today: boolean;
    week: boolean;
    month: boolean;
  }>>,
  timeFrame: string
}

export const Detailed = (props: allTodos) => {


  let categoryPage = [
      <CategoryDetailed
        key={'0-items-today'}
        togglePage={props.togglePage}
        categoryHours={0}
        categoryName={'No Tracked Todos'}
        todos={[]}
      />
  ];
  if (props.categoryHours) {
    categoryPage = (
      Object.keys(props.categoryHours).map((category) => (
        <CategoryDetailed
          key={`${category}`}
          togglePage={props.togglePage}
          categoryHours={props.categoryHours[category]}
          categoryName={category}
          todos={props.todos.filter((todo) => (todo.category_name === category))}
        />
      ))
    )
  }
  return (
    <Container sx={{p: 2}} maxWidth='sm'>
      <h1>{props.timeFrame}</h1>
      <Stack sx={{mx: 2}} spacing={2}>
        {categoryPage}
      </Stack>
    </Container>
  )
}