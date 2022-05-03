import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /weather', () => {
  describe('given a cityname', () => {
    const body = {
      cityname: 'london',
    };
    it('should respond with a 200 status code', async () => {
      const response = await request.post('/weather').send(body).expect(200);
    });

    it('should specify json in the content type header', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.headers['content-type']).toContain('json');
    });
  });

  describe('when the cityname is', () => {
    it('wrong, it should respond with a status code 404', async () => {
      const body = {cityname: 'lomdon'};
      const response = await request.post('/weather').send(body);
      expect(response.statusCode).toBe(404);
    });
    it('missing, it should respond with a status code 400', async () => {
      const bodyData = [{cityname: ''}, {cityname: null}, {}];

      for (const body of bodyData) {
        const response = await request.post('/weather').send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
