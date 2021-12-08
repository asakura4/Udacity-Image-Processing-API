import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('endpoint api test - ', () => {
  it('website is alive', done => {
    request
      .get('/api')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('Hello, world!');
        done();
      });
  });

  it('file name is missing', done => {
    request
      .get('/resize/image')
      .set('Accept', 'application/json')
      .expect(200)
      .expect({ error: 'Please input the file name.' }, done);
  });

  it('file name does not exists', done => {
    request
      .get('/resize/image?filename=abc.jpg')
      .set('Accept', 'application/json')
      .expect(200)
      .expect({ error: "Selected image doesn't exist." }, done);
  });

  it('width is not correct', done => {
    request
      .get('/resize/image?filename=santamonica.jpg&width=x6')
      .set('Accept', 'application/json')
      .expect(200)
      .expect({ error: 'please check whether width is correct or not.' }, done);
  });

  it('height is not correct', done => {
    request
      .get('/resize/image?filename=santamonica.jpg&width=300&height=x5')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(
        { error: 'please check whether height is correct or not.' },
        done
      );
  });
});
