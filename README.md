# Express js API

This is a simple express js api with typescript and mongodb.

## Up and Running

To start project on `production` environment using `docker` use below steps.

-   Run `cp .env.example .env` to copy `.env.example` contents into `.env` file.
-   Change environment variables to appropriate values :
    -   `PORT`
    -   `DBURL`
    -   `MONGO_DB_ROOT_USERNAME, MONGO_DB_ROOT_PASSWORD, MONGO_DB_NAME`
    -   Be sure to fill mongodb credentials in `DBURL` variable.
    -   mongodb url format is `mongodb://<username>:<password>@xcoin-mongo:<port>/<database>`
-   Run `docker-compose up --build - d` and wait until docker download images (for the first time)
-   Open `http://127.0.0.1:{PORT}` in your browser to check service
-   Run `docker-compose down` to stop containers

## Database migrations

You should enter exposed db url in order to run seeds or migrations.
Another way is to use `docker-compose exec api bash` to enter container and run migrations.

Then start the migrations using following:

**Seeds**

```
npm install -g ts-node

ts-node src/scripts/seed.ts
```

# My steps for code review

## Docker

First of all I started writing docker file and docker compose for the project to run it in a containerized environment. I used the official node image and added the necessary dependencies. I also added the mongo image to the docker compose file. Mongo db data is stored in a volume so no data will be lost.

-   There is an nginx.conf file in the project which can used for proxing the api.

## Environment variables

After that I added the environment variables to the docker compose file and also added the .env.example file to the project. I also added the dotenv package to the project to read the environment variables from the .env file.

## Logs And Error Handling

I added the winston package to the project for logging. I created a logger.ts file in the project and added the necessary configurations. I also added the express-async-errors package to the project for error handling. I created an error.ts file in the project and added the necessary error classes.
Each request is logged with the winston package. I also added the morgan package to the project for logging the requests.

## API Validation and Testing

APIs needed validation for body with propper response. Also added some test for the project. I used the jest package for testing. I created a test folder in the project and added the necessary tests. I also added the supertest package to the project for testing the APIs.
