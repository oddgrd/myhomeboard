FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Ensure package.json AND yarn-lock.json are copied
COPY package.json ./
COPY yarn.lock ./

# Install dependencies on first build/when dependencies
# change
RUN yarn

# Bundle app source
COPY . .

RUN yarn build

# Set NODE_ENV to production
ENV NODE_ENV production

CMD [ "node", "dist/index.js" ]

# Non-root User
USER node
