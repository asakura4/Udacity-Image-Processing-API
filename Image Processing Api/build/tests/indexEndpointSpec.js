"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
var supertest_1 = __importDefault(require("supertest"));
var request = supertest_1.default(index_1.default);
describe('endpoint api test - ', function () {
    it('website is alive', function (done) {
        request
            .get('/api')
            .expect(200)
            .then(function (res) {
            expect(res.text).toBe('Hello, world!');
            done();
        });
    });
    it('file name is missing', function (done) {
        request
            .get('/resize/image')
            .set('Accept', 'application/json')
            .expect(200)
            .expect({ error: 'Please input the file name.' }, done);
    });
    it('file name does not exists', function (done) {
        request
            .get('/resize/image?filename=abc.jpg')
            .set('Accept', 'application/json')
            .expect(200)
            .expect({ error: "Selected image doesn't exist." }, done);
    });
    it('width is not correct', function (done) {
        request
            .get('/resize/image?filename=santamonica.jpg&width=x6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect({ error: 'please check whether width is correct or not.' }, done);
    });
    it('height is not correct', function (done) {
        request
            .get('/resize/image?filename=santamonica.jpg&width=300&height=x5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect({ error: 'please check whether height is correct or not.' }, done);
    });
});
