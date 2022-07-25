import { Stack } from "@mui/material";
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
  categoryHours: any,
  togglePage: React.Dispatch<React.SetStateAction<{
    home: boolean;
    today: boolean;
    week: boolean;
    month: boolean;
}>>
}

export const TodayDetailed = (props: allTodos) => {
  return (
    <Container sx={{p: 2}} maxWidth='sm'>
      <h1>Today</h1>
      <Stack sx={{mx: 2}} spacing={2}>
        {Object.keys(props.categoryHours).map((category) => (
          <CategoryDetailed
            key={`${category}`}
            togglePage={props.togglePage}
            categoryHours={props.categoryHours[category]}
            categoryName={category}
            todayTodos={props.todayTodos}
          />
        ))}
      </Stack>
    </Container>
  )
}