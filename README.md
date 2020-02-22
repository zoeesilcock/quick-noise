# Quick Noise

A tool for playing noise from one device and controlling it from other devices. The goal is to have the ability to start noise at your fingertips.


## Development

The project uses react-scripts for the frontend development but also contains a node backend, both need to be started during development:
```
npm start
npm run start-api
```

Alternatively you can use Docker:
```
docker-compose up
```

Visit http://localhost:3000


## Tests

The tests are run via Jest and are found under `__tests__` in a couple of places in the project.
```
npm test
```
