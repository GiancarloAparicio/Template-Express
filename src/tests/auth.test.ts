// import App from '../App';
// import request from 'supertest';

// let app = new App();
// beforeAll(() => {
// 	app.listen(4000);
// });

// describe('GET / - a simple api endpoint', () => {
// 	it('Hello API Request', async () => {
// 		const response: any = await request(app.getApplication()).get('/');
// 		expect(response.message).toEqual('hello');
// 		expect(response.statusCode).toEqual(200);
// 	});
// });

describe('test', () => {
	test('sum', () => {
		expect(4 + 4).toBe(8);
	});
});
