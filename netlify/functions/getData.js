const fetch = require('node-fetch');

exports.handler = async function (event, context) {
	console.log('Function triggered!');
	console.log('Query params:', event.queryStringParameters);
	console.log('Token present:', !!process.env.AIR_API_TOKEN);
	const { city } = event.queryStringParameters;
	const API_KEY = process.env.AIR_API_TOKEN;

	if (!city) {
		return {
			statusCode: 400,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'City parameter is required.' }),
		};
	}

	try {
		const response = await fetch(
			`https://api.waqi.info/feed/${city}/?token=${API_KEY}`
		);

		if (!response.ok) {
			const data = await response.text(); // Possibly not JSON
			return {
				statusCode: response.status,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					error: `API request failed with status ${response.status}`,
					details: data,
				}),
			};
		}

		const data = await response.json();

		if (data.status === 'ok') {
			return {
				statusCode: 200,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data.data),
			};
		} else {
			return {
				statusCode: 404,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					error: 'City not found or API error',
					details: data,
				}),
			};
		}
	} catch (err) {
		console.error('Fetch error:', err);
		return {
			statusCode: 500,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				error: 'Server error',
				details: err.message,
			}),
		};
	}
};
