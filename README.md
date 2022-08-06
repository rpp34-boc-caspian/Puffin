# Puffin (Todo & Calendar App)

One Paragraph of project description goes here

## Technologies used
Set-up and Workflow:  Docker, Circle CI
Frontend Development:  React, Typescript, Material UI, React-Big-Calendar
Backend Development:  Postgres, Node.js, Express
Testing:

## Description
### Authentication:

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

### Sharing todos/calendar

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
