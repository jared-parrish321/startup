# Startup Specification
## Elevator Pitch
Since the dawn of the internet, as a society we have never been more connected. However, on a more micro scale, we have never been so disconnected. We try to use social media to stay in touch with friends and family, but social media has started to push influencers over people you have a connection with. 

What we need isn't another form of social media. We need a simple website which helps us to hang out with friends and get away from our devices. What I am proposing is a website called **QuickConnect**. On this site, friends can go on at any time and update their availability for a given day . This is in the form of a familiar calendar. Friends can block out when they are free or are totally unavailable. Finding a time to hang out will never be easier.

Instead of relying on socail media to connect to our friends and family, **QuickConnect** can help us to stengthen our precious relationships.

## Design
Here is what the first page a user sees after logging in would look like

![Day-of-WeekButtons](https://github.com/jared-parrish321/startup/assets/74101493/5640b5c1-2a1a-48df-9e4c-1af388d18313)

Here is what a user would see for each day when they are updating their schedule

![MondaySchedule](https://github.com/jared-parrish321/startup/assets/74101493/95d48a3f-26f1-4b5d-a4ae-148487928eb1)

Here is a rough blueprint of how users would interact with the server

![QuickConnectBackend](https://github.com/jared-parrish321/startup/assets/74101493/f9ea2392-6c81-4ce4-bd01-dcf4a03a64bd)

## Key Features
- Authentication
- Ability to update your schedule
    - Ability to set your availabilty to busy (red) or available (green)
    - Ability to add a note next to availability so others know what you want them to join you for
    - Ability to update your whole schedule and then update all at once
- Ability to view others schedule
    - Ability to see real-time information
    - Ability to see overlap of users
    - Ability to see notes from every available user if neccessary
- Ability for admin to add or remove users

## Technologies
- **HTML:** Follows HTML guidelines. 10 HTML pages
    1. Login
    2. Day-of-Week Buttons
    3. Day-of-Week Calendars (7 HTML pages)
    4. Update your own Calendar
- **CSS:** Consistent styling that makes navigating and seeing the application easier
- **JavaScript:** Implements login authentication, updating group calendar, updating personal calendar, navigating applications, backend
- **Database:** Stores group calendar

## HTMl Deliverable
- HTML pages - 9 HTML pages representing the 7 days, login, and the Days of Week view
- Links - The login page links to the the Days of Week page. The Days of Week page has buttons that link to the 7 day-pages
- Text - All of the text has been filled out including example activities on the day-pages
- Images - I currently do not need images so I haven't added any
- Login - Input box and submit button for login
- Database - The activities represent data pulled from the database

## CSS Deliverable
- Header, footer, and main content body
- Navigation Elements - made responsive and pretty
- Application Images - Added and styled a photo
- Consolidated 9 pages to 2
- Responsive to window resizing 
- Application elements - Good white space and contrast
- Application text content - Consistent fonts

## Javascript Deliverable
- Login = Implemented script for logging in. The username appears on Day page
- Database - Implemented script for pushing and pulling data for table in JSON format
- Interaction - The table is editable and you can select the day to then update that table

## Service deliverable
- **Node.js/Express HTTP service** - Completed
- **Static middleware for frontend** - Completed
- **Calls to third party endpoints** - Completed (quote on login page)
- **Backend service endpoints** - Placeholders for login that stores the current user on the server. Endpoints for submitting and pulling calendars
- **Frontend calls service endpoints** - Completed (Fetch)
  
## DB/Login deliverable

- **MongoDB Atlas database created** - Completed
- **Stores data in MongoDB** - Completed
- **User registration** - Creates a new user in the user collection
- **Use MongoDB to store credentials** - Stores user and all events for calendar
- **Restricts functionality** - You cannot see any data or run commands until you have logged in

