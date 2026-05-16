## Dev

### Environment

Docker is required to run the redis and postgres databases locally.

### Env vars

We need to populate the server .env variables, list in .env.example.

- Get the database variables from docker-compose containers, for redis and postgres.
- Generate a random string for the session secret.
- Get the google secret from GCP.
- The port is the port the server should listen on, which at the time of writing the client expects
to be 4000.
- Get the cloudinary URL from cloudinary account.

### Local run

To develop the application locally, we need to first start the server and the database containers:

```sh
mise server-dev
```

Next, we can start the frontend next.js application:

```sh
mise client-dev
```

You may want to clear the browser local storage, which holds the apollo-cache, between local runs.

### Running tests

Currently, only the server has automated tests. These tests will run against docker redis and
postgres containers, with test migrations defined in `server/test-utils`. Run the tests with:

```sh
mise server-test
```