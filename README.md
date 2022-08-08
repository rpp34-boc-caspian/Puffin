# Puffin (Todo & Calendar App)

One Paragraph of project description goes here

## Technologies used
Set-up and Workflow:  Docker, Circle CI
Frontend Development:  React, Typescript, Material UI, React-Big-Calendar
Backend Development:  Postgres, Node.js, Express
Testing:

## Description
### Authentication:
1. Account Creation:
  - Users can create an account with at the sign up page, obtain a cookie, and navigate the rest of the site.
  - Returning users also recieve a cookie upon sign in. 
  - Passwords are encrypted and stored within the database.
  - On sign in, the system compares the password provided and the stored password.
    - If the passwords match, the compare function returns true and the system returns a cookie of the username and id within the database.

2. Sign Up: 
  - The Sign Up page checks information that is being input by the user.
    - It checks to make sure the email address is valid via regex and that the passwords match.
    - If these two things are input correctly, the server will make sure that the username and email aren't already in use. 
    - Any failed attempt will give feedback to the user asking for changes.
    
3. Sign In:
  - The Sign In page checks inputed information with the server.
  - Requests are made for rows within the Postgres database where the username and email are present.
    - Returned data is checked to make sure that the email belongs to the username provided. The hashed password is then compared to the provided one.
    - Should the data returned not have the email but the username, or vice versa, the server will notify the client which piece of information is already       in use.

### Home page:
1. Unscheduled todo list: 
  - Users can toggle the unscheduled todo list open or closed by clicking the "todo list" icon in the navigation bar.
  - Users can mark any unscheduled todo as completed and see a strike through of that todo (as in it's being checked off the list). 
  - When the user logs into the account the next time, any striked-through (completed) unscheduled todos disappear from the list completely.
  - Users can delete any unscheduled todo from the list by clicking the "delete" button.
  - Users can drag any incomplete unscheduled todo from the list and drop it into the desired time slot in the daily calendar.
  </br>
    <img src="https://user-images.githubusercontent.com/84343573/183218686-52b06c1d-9cdd-429e-b6dd-f0103e35c8b5.gif" width="30%" />

2. Daily calendar:
  - Displays all todos scheduled in the selected date, displaying the title, time and custom selected color.
  - Users can move/resize the todos to reassign its start and end times on the calendar.
  - Users can edit, mark as completed, and delete todos from the calendar.
  - Users can view selected friends from dropdown menu to view todos authored by friends who have shared with user.
  </br>
  <img src="https://media.giphy.com/media/3RAc6QNwvQwF4j3ZkU/giphy.gif" width="30% />

3. Navigation
  - Today Button: Takes a user to today's date on the calendar
  - Calendar Button: Allows user to pick a desired date to navigate to in the main calendar.
  - List Button: Displays list of unscheduled todos.
  - Add Button: Allows user to add a new todo.
  - Share Button: Allows user to share calendar, categories, todos with friends.
  - User Button: Allows user to view reports, profile and logout.
  
### Add/Edit todos:
- User can navigate to the Create-todo form from the "Plus" icon on the calendar.
- On the Create-todo form, user can add a new item with title and description inputs.
- If user checks the Add to calendar box then Start/end input boxes will show and the item will be added automatically to the calendar. If not checked then the item will go to the Unscheduled todo listing of the calendar. User then review the unscheduled todo listing and drag/drop items to the calendar later. 
- If user checks the Share with Friends and then enter a friend's email. The item will be shared with the friend later
- User can select the categories to tag the todo items. If a category is not on the list, user can add new category by selecting the Add category and a modal will pop up. The modal allows user to enter the name and select the color for the category.
- Once on the calendar, user can click on the Edit button to see the Edit todo form in which they can update any fields

### Sharing todos/calendar
1. Calendar, Categories, and Todos
  - Users can choose between the different types of items to share.
  - They can choose the whole calendar.
  - They can choose the categories.
  - They can choose the todos.
2. Ability to add the individuals to share the data with.
  - The plus sign will let you add friends.
  - Press the share button to share.
<img src="https://media.giphy.com/media/lLcajTbjRw5GGLXkxv/giphy.gif" width="30%"/>

### Report
- Users can monitor all completed todos.
- Users can view completed todos for today, this week, and this month.\
- The completed todos are seperated by category and assigned the category color.
- Completed todo data is displayed using interactive graphs (chart.js).
- Users can view detailed view of completed todos.
  - In this view, users can see the indivdual todos names and time tracked.
  - In this view, users can edit the tracked time for a completed todo.
<img src="https://media4.giphy.com/media/3HoQhepNLGJkrFA0EF/giphy.gif" width="30%"/>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running


## Running the tests

Explain how to run the automated tests for this system


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds



## Contributors
- Jane Srisarakorn (Product Manager & Software Engineer)
- Darian Hogue (Architecture Owner & Software Engineer)
- Xinxin Li (UI Owner & Software Engineer)
- Cornelius Smith (Software Engineer)
- Keegan Wolf (Software Engineer)
- Tam Tran (Software Engineer)

## Acknowledgments
[React Big Calendar Docs](http://jquense.github.io/react-big-calendar/examples/index.html?path=/story/about-big-calendar--page)
