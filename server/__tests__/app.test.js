const request = require('supertest');
const app = require('../app');

const hasIndexRoute = (routes) => {
  let hasIndex = false;

  for (var i = 0; i < routes.length; i++) {
    if (routes[i].route && routes[i].route.path ==='/') {
      hasIndex = true;
    }
  }

  return hasIndex;
}

describe('Test the example API route', () => {
  it('should respond 200 ok to the GET method', async () => {
    const response = await request(app).get('/api/hello');

    expect(response.statusCode).toBe(200);
  });
});

describe('development environment', () => {
  let devApp = null;

  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'development';
    devApp = require('../app');
  });

  it('should include Access-Control-Allow-Origin: * in the response headers', async () => {
    const response = await request(devApp).get('/api/hello');

    expect(response.statusCode).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });

  it('should not serve our index file', () => {
    expect(hasIndexRoute(devApp._router.stack)).toBeFalsy();
  });
});

describe('production environment', () => {
  let productionApp = null;

  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'production';
    productionApp = require('../app');
  });

  it('should not include Access-Control-Allow-Origin: * in the response headers', async () => {
    const response = await request(productionApp).get('/api/hello');

    expect(response.statusCode).toBe(200);
    expect(response.headers['access-control-allow-origin']).not.toBe('*');
  });

  it('should serve our index file', async () => {
    const response = await request(productionApp).get('/');

    expect(response.statusCode).toBe(200);
    expect(hasIndexRoute(productionApp._router.stack)).toBeTruthy();
  });
});
