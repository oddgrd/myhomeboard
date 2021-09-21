# myHomeBoard - PERN stack project

## Tech stack: 
### Frontend
- Typescript
- Next.js
- Apollo Client
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
- Google Oauth
- tbd: twitter, github oauth

### Deployment
The client is deployed on Vercel, and can be continually developed using the Vercel CLI.
The backend is deployed as a Dokku VPS, proxied by ngingx, in a DigitalOcean Droplet with the node.js GraphQL API, Redis and Postgres running in separate Docker containers. 
The API can be continually developed by pushing a new docker build to Docker Hub, pulling it into the Dokku VPS and deploying.
