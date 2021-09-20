# myhomeboard - PERN stack project
---
Tech stack: 
### Frontend
- Next.js
- Apollo Client
- Sass modules

### Backend
- Node.js
- Express
- Apollo Server
- TypeORM
- TypeGraphQL

### Databases
- Postgresql 
- Redis (session storage)

### Deployment
The client is deployed on Vercel, and is continually developed using the Vercel CLI.
The backend is deployed in a DigitalOcean Dokku Droplet, proxied by ngingx, with the node.js GraphQL API, Redis and Postgres running in separate Docker containers. 
