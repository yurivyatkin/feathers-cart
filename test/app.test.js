const rp = require('request-promise');
const url = require('url');
const app = require('../src/app');

const port = app.get('port') || 3030;
const getUrl = pathname =>
  url.format({
    hostname: app.get('host') || 'localhost',
    protocol: 'http',
    port,
    pathname,
  });

describe('Feathers application tests (with jest)', () => {
  beforeAll(done => {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });

  afterAll(done => {
    this.server.close(done);
  });

  it('informs that it is headless', () => {
    expect.assertions(1);
    return rp(getUrl()).then(body =>
      expect(JSON.parse(body)).toEqual({
        message: 'This is the root of a headless API',
      })
    );
  });

  describe('404', () => {
    it('generates a 404 error for non-existent paths', () => {
      expect.assertions(1);
      return rp({
        url: getUrl('path/to/nowhere'),
        headers: {
          Accept: 'application/json',
        },
      }).catch(res => {
        expect(res.statusCode).toBe(404);
      });
    });

    it('shows a 404 JSON error without stack trace', () => {
      expect.assertions(3);
      return rp({
        url: getUrl('path/to/nowhere'),
        json: true,
      }).catch(res => {
        expect(res.statusCode).toBe(404);
        expect(res.error.code).toBe(404);
        expect(res.error.message).toBe('Page not found');
      });
    });
  });
});
