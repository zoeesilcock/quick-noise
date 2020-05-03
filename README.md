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

Application is on port 3000: http://localhost:3000
API is on port 5000, example: http://localhost:5000/api/hello


## Production
Build an image
```
docker image build -t quicknoise:<version> .
docker tag <image> quicknois:latest
```

Deploy
```
kubectl -n quicknoise apply -f k8s/
```


## Tests

The tests are run via Jest and are found under `__tests__` in a couple of places in the project.
```
npm test
```
