# Build environment
FROM node:lts-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent

COPY . /app
RUN npm run build


# Production environment
FROM node:lts-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --production --silent

COPY server /app/server
COPY --from=build /app/build /app/build

EXPOSE 80
CMD ["node", "server"]