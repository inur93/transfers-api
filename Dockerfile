FROM node:16.9.0-alpine as builder

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# production
FROM node:16.9.0-alpine as production

RUN mkdir -p /home/node && chown -R node:node /home/node

# Set CWD
WORKDIR /home/node

# Copy package.json and package-lock.json
COPY ./package.json ./
COPY ./yarn.lock ./

# Switch to user node
USER node

# Install libraries as user node. If NODE_ENV=production dev_dependencies will not be installed.
RUN yarn install --frozen-lockfile --production=true

# Copy js files and change ownership to user node. we copy only content from src/ folder as test/ folder is not necessary
COPY --chown=node:node --from=builder /app/build ./server

EXPOSE 80
EXPOSE 443

CMD ["node", "./server/src/server.js"]