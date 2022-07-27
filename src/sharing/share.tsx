import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Circle } from "@mui/icons-material";
import Categories from "./components/Categories";
import internal from "stream";
import { red } from "@mui/material/colors";

export const Share = () => {
  const userEx =
  {
    username: 'Mandy',
    calendar: 'Mandy Cal',
    categories: [
      {
        name: 'Eat',
        todos: [
          {
            title: 'Broccoli',
            complete: false,
            permission: 1
          },
          {
            title: 'Cheese',
            complete: false,
            permission: 1
          },
        ]
      },
      {
        name: 'Study',
        todos: [
          {
            title: 'Science',
            complete: false,
            permission: 1
          }
        ]
      }
    ],
    friends: ['Tim', 'Sarah']
  }

  return (
    <Container>
      <div>
        <label>
          Sharing With Friends
        </label>
      </div>
      <List>
        <ListItemText>{userEx.calendar}</ListItemText>
        <Categories username={userEx.username} categories={userEx.categories} calendar={userEx.calendar} friends={userEx.friends}/>
      </List>
      <div>
        <label>
          Select Calendar / Categories / Events
        </label>

      </div>
      <div>
        <label>
          Share With Friends
        </label>
      </div>
      <div>
        <label>
          Add Friends
        </label>
      </div>
    </Container>
  );
};