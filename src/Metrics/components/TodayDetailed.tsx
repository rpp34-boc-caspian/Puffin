import { Card, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { CategoryDetailed } from "./CatergoryDetailed";

interface userTodo {
  title: string,
  start_date: string,
  end_date: string,
  complete: boolean,
  username?: string,
  category: string
}
interface allTodos {
  todayTodos: userTodo[],
  todayTotalHours: number,
  categoryHours: any
}

export const TodayDetailed = (props: allTodos) => {

  useEffect(() => {

  }, [props.todayTotalHours, props.categoryHours, props.todayTodos])


  return (
    <Container sx={{p: 2}} maxWidth='sm'>
      <h1>Today</h1>
      <Stack sx={{mx: 2}} spacing={2}>
        {Object.keys(props.categoryHours).map((category) => (
          <CategoryDetailed
            categoryHours={props.categoryHours[category]}
            categoryName={category}
            todayTodos={props.todayTodos}
          />
        ))}
      </Stack>
    </Container>
  )
}