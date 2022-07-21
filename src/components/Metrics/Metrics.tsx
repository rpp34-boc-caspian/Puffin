import { type } from "os"
import { Month } from "./components/Month"
import { Today } from "./components/Today"
import { Week } from "./components/Week"


type userTodos = {
  title: string,
  start_date: string,
  end_date: string,
  complete: boolean,
  username?: string
}

export const Metrics = (todos: userTodos) => {

return (
  <div>
    <Today></Today>
    <Week></Week>
    <Month></Month>
  </div>
)
}