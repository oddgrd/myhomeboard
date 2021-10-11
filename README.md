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

The client is deployed on Vercel, and can be continuously deployed by pushing to the Github repository.
The backend is deployed as a Dokku VPS, proxied by ngingx, in a DigitalOcean Droplet with the Node.js GraphQL API, Redis and Postgres running in separate Docker containers.
The API can be continuously deployed by pulling from github and pushing to Dokku.
