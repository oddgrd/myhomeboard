FROM node:24-slim

# enable pnpm via corepack (ships with Node 24)
RUN corepack enable

# Create app directory
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

# Install dependencies on first build/when dependencies
# change
RUN pnpm install --frozen-lockfile

# Bundle app source
COPY . .

RUN pnpm build

# Set NODE_ENV to production
ENV NODE_ENV=production

CMD [ "node", "dist/index.js" ]

# Non-root User
USER node
