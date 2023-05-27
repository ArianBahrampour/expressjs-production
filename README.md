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
