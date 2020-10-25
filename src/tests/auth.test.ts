import App from '../App';
import request from 'supertest';

const app = new App();
beforeAll(() => {
	app.listen(4000);
});

describe('GET / - a simple api endpoint', () => {
	it('Hello API Request', async () => {
		const response = await request(app.getApplication()).get('/auth/login');
		expect(response.body.message).not.toBe('hello');
		expect(response.status).not.toBe(200);
	});
});

describe('test', () => {
	test('sum', () => {
		expect(4 + 4).toBe(8);
	});
});
