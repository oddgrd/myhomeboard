# myHomeBoard - PERN stack PWA

## Tech stack:

- Typescript

### Frontend

- Next.js
- Apollo Client
- GraphQL Codegen
- Scss
- Jest

### Backend

- Node.js
- Express
- Apollo Server
- TypeORM
- TypeGraphQL
- Jest
- Google OAuth

### Databases

- Postgresql
- Redis (session storage)

### Cloud Storage

- Cloudinary (Image storage and transformation)
- AWS S3 (Scheduled backups of Postgres DB)

### Analytics

- Client: Vercel Analytics
- API: Apollo Studio

### Deployment

- Vercel
- DigitalOcean
- Dokku
- Docker
- Automated CI/CD with GitHub Actions

The client is hosted on Vercel. The server is hosted on DigitalOcean as a Dokku VPS, with the express API, Postgres and Redis running in separate Docker containers.
The client and API are continuously deployed through separate Github Actions workflows with integrated testing. When deploying the API integration tests are ran against a temporary Docker Postgres service with the same schema as the production database.
