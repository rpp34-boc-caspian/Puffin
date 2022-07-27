import { Stack } from "@mui/material";
import { Container } from "@mui/system";
import { CategoryDetailed } from "./CatergoryDetailed";

interface userTodo {
  title: string,
  start_date: string,
  end_date: string,
  complete: boolean,
  username?: string,
  category: string,
  color: string
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
        todayTodos={[]}
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
          todayTodos={props.todos.filter((todo) => (todo.category === category))}
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