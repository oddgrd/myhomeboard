# myHomeBoard - PERN stack project

## Tech stack:

### Frontend

- Typescript
- Next.js
- Apollo Client
- GraphQL Codegen
- Sass modules

### Backend

- Typescript
- Node.js
- Express
- Apollo Server
- TypeORM
- TypeGraphQL

### Databases

- Postgresql
- Redis (session storage)

### Image Management

- Cloudinary

### Authentication

- Google OAuth

### Deployment
- Vercel
- GitHub Actions

The client is deployed on Vercel where it is automatically redeployed on push to Github through Vercel's Github integration.
The server is deployed as a Dokku VPS in a DigitalOcean Droplet with the Node API, Postgres and Redis running in separate, linked containers.
The API is automatically redeployed through a Github Action on pushes to Github containing changes to the server directory.
