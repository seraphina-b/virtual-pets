# Virtual Pet Project (Final project w/CodeOp)

## Objectives

To create a virtual pet application that allows you to create and care for your own virtual pet!

### Useful links:

- Trello (https://trello.com/b/JF1NxuI1/collaborative-project)
- GitHub (https://github.com/CodeOp-tech/fs4-final-project-2)
- DB Designer (https://app.dbdesigner.net/designer/schema/279042)

### Things to (eventually) include in Readme..

- Table of contents

- Database schema
- API route plan
- Full stack architecture drawing
- Collaborators
  - Kat, Nicole & Seraphina (add social network? github?)
- Explain in further detail:
  - Frontend
  - Server
  - Database
  - Third party API integration
  - Future features

## GitHub Setup

- Before you get started make sure you have the most up to date version from GitHub
- cd into the folder you are working in

`git pull --rebase upstream staging` (to pull the latest updates from GitHub)

- Work on project as normal

`git add .`

`git commit -m "message"`

`git push origin staging` (pushes your edits to GitHub)

- Go to GitHub and the original repository:
  https://github.com/CodeOp-tech/fs4-final-project-2
- Click **Compare & pull request**
- Add comment and click **Create pull request**
  (Ideally by another team member)
- If all is green click **Merge pull request**
- Click **Confirm merge**
- Purple is good!

## User flow diagram

![user flow-main screen](./userflow-mainscreen.png)

## API Routes

| URI| HTTP Method | Description   | Request Object | Response Object |
|----------|-----------:|:-------------:|:--------------:|----------------:|
|/api/pets | GET         | gets all pets | n/a | { id: integer    name: string   age: integer    lastFed: integer}|
|/         | POST        | Inserts pet name and dateCreated
|/events |             | | | |


## Frontend Routes
| URL      | Description |
|----------|-------------|
|/         |             |
|/create   |             |
|/pets     |             |
|/pets/:id |             |
|/new      |             |
|/login    |             |
|/register |             |
|/logout   |             |
|/events |             |
|events/fed      |             |

### Methodology Github

#### Step 1

Fork the original project into your local repo and clone the document in your local.
![gitclone](./screenshots/git-clone.PNG)

#### Step 2

Add a new remote to your local repo, this way you will have access to both of the remotes, the original and your fork.
In this case, we call the new remote upstream. The branch stagging in the upstream remote will be the one used to commit the contributions:

bach
git remote add upStream
![git](./screenshots/remote-add-upstream.PNG)
Now, the project is linked to two remotes, your fork and the original upstream:
![git](./screenshots/remote-v.PNG)

#### Step 3

Work in your fork and commit the changes in your local. When having something enough relevant to push into the upstream repository follow the next steps:

1. Pull the state of the upstream repository stagging branch and merge with your changes in your local with the command: This will automatically merge the state into your local:
   bach
   git pull --rebase upStream branch
   ![git](./screenshots/rebase.PNG)
   In the case of having conflicts between the 2 repos, you will need to merge manually.
   After that try:
   bach
   git pull upStream branch
   2.Push the merged state into your fork:
   bach
   git push origin staging
   ![git](./screenshots/push.PNG)
   3.Request a pull from to the upstream repository and wait for the approval to merge your contribution into the upstream stagging branch.

### Database prep

- Create the local MySQL database and table(s) to be used by your app.
- Add a .env to your root folder containing the MySQL authentication information for the root user as well as the name of your database. For example:
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=YOURPASSWORD
  DB_NAME=YOURDATABASE

## Data Migration
Option 1:
-In terminal, cd to server
- Run node model/migration.js to run DB migrations. This will **DELETE** all your tables and data, and will re-create all tables with some dummy data.

### Dependencies

- Run yarn install in project directory. This will install server’s project dependencies such as express.
- cd client and run yarn install. This will install client dependencies (React).

### Development

- Run yarn start in project directory to start the Express server on port 5000
- cd client and run yarn start to start client server in development mode with hot reloading in port 3000.
- Client is configured so all API calls will be proxied to port 5000 for a smoother development experience. Yay! (thanks to the proxy attribute in client/package.json file.)
- You can test your client app in http://localhost:3000
- You can test your API in http://localhost:5000/api
- If you access http://localhost:5000 without running a client build first, you will be prompted with an error: Express is trying to serve you the /client/build/index.html file, but it hasn’t been generated yet.
- if you just want to run the client, you can run yarn start:client

### Run Your Build

- cd client and run npm run build. This will execute react-build and create your production build into your /client/build directory.
- if you want just to build the client locally, you can execute `yarn build:client

### Notes

## Evolutions of types of Tamagotchi

## Life stages

After wakes up the Tamagotchi, it shows up as an egg and starts pulsating. It hatches in 5 min and immediately gets hungry.


All Tamagotchis naturally evolve over time as they age, starting from the egg to the baby, child, teen, and adult stages. On some occasions, it can evolve into a Senior stage. The majority of Tamagotchi characters have a variety of different forms they can evolve into, but what they become depends predominantly on how they were cared for in their current stage. For example, on the original Tamagotchi, if Marutchi is well cared for, it will evolve into Tamatchi. However, if it is neglected, it will evolve into Kuchitamatchi.

## Hunger
Tamagotchi starts beeping immediately after its born to notify that it needs food. 

A Tamagotchi can be fed a rice bowl or bread in some versions (you choose). When a Tamagotchi is fed, it fills one heart and can fill up to five hearts, with 2 hidden hearts--7 hearts results in an overfeeding status.

https://www.makeuseof.com/tag/tamagotchi-keep-alive/

A heart drops every 15-30 min. If the hearts are empty, this affects its health status.

Missing three consecutive calls for empty hungry hearts will result in an evolution to Puchiputchi.

http://www.mimitchi.com/html/tamatip.htm


Missing three consecutive calls for empty hungry hearts will result in an evolution to Puchiputchi. Missing three consecutive calls for empty happiness hearts will result in evolutions to Paparatchi, and overfeeding them on three occasions by filling up seven hearts will result in an evolution to Puddingtchi.

## Pooping

The tamagotchi poops about one hour after the user feeds it and the user has to clean up after it eats and will show signs of discomfort or wiggle on screen when it needs to. The faster the user cleans up after the better.  Otherwise the Tamagotchi can get sick.

for more information: https://tamagotchi.fandom.com/wiki/Care

## Care mistakes