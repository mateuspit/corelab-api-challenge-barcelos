## HOW TO USE MY API APPLICATION

Unlike other ORMs, Lucid, which is the most common AdonisJS ORM, does not create a PostgreSQL database by itself. Therefore, it is necessary to create a PostgreSQL database before running the migrations.

1. Create a database in PostgreSQL.

2. Configure your `.env` file to match the `.env.example` file with the name of the database you chose in step 1.

3. Run the migrations to set up your created database from step 1:<br>
```node ace migration:run```

4. Build the project:<br>
`node ace build`

5. To start the server in production:<br>
`cd build`<br>
`npm ci --production`

6. Copy the .env file to the build directory

7. Start server<br>
`node server.js`<br><br>

## API ROUTES

##### GET|HEAD    ~/api/health 
Displays information about the application's health status, indicating if it is online.
##### GET|HEAD     ~/api/todolists
Retrieves all tasks present in the database.
##### POST         ~/api/todolists 
Creates a task with input validation.
##### GET|HEAD     ~/api/todolists/:id
Retrieves a specific task by its ID.
##### PUT|PATCH    ~/api/todolists/:id
Updates a task by its ID, with input validation.
##### DELETE       ~/api/todolists/:id
Deletes a task by its ID.

## ABOUT THE CHALLENGE
I have never used AdonisJS before, but I believe that a software developer can learn any technology. So, I decided to give AdonisJS a try and explore its paradigms. I have worked with Lucid, which is the most common ORM for AdonisJS. I have implemented exceptions, validations, and other features as outlined in the AdonisJS documentation.