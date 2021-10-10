FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Ensure package.json AND yarn-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

# Install dependencies on first build/when dependencies
# change
RUN yarn

# Bundle app source
COPY . .
COPY .env.production .env

RUN yarn build

# Set NODE_ENV to production
ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "dist/index.js" ]

# Non-root User
USER node
