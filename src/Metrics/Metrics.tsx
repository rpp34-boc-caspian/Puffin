import { Container, Stack } from "@mui/material"
import { useState } from "react"
import { Month } from "./components/Month"
import { Today } from "./components/Today"
import { Week } from "./components/Week"
import { Routes, Route } from "react-router-dom"

interface userTodo {
  title: string,
  start_date: string,
  end_date: string,
  complete: boolean,
  username?: string,
  category: string
}

interface allTodos {
  todos?: userTodo[],
}

export const Metrics = (props: allTodos) => {
  const todoData = [
      {
        title: 'Study Math',
        start_date: '7/22/22 4:00',
        end_date: '7/22/22 14:00',
        complete: true,
        username: 'Jimmy Bo',
        category: 'School'
      },
      {
        title: 'Study History',
        start_date: '7/22/22 14:00',
        end_date: '7/22/22 16:00',
        complete: true,
        username: 'Jimmy Bo',
        category: 'School'
      }
  ]
  const [today, updateTodayMetrics] = useState(todoData)

  return (
    <>
      <Container sx={{p: 2}} maxWidth='sm'>
        <h1>Reports</h1>
        <Stack sx={{mx: 2}} spacing={2}>
          <Today todayTodos={today}></Today>
          <Week></Week>
          <Month></Month>
        </Stack>
      </Container>
    </>
  )
}