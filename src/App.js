import './App.css';

// Using the Async functionality allows for a better communication with external API sources.
const getAirQuality = async (city) => {
	try {
		const response = await fetch(
			`https://api.waqi.info/feed/${city}/?token=${process.env.REACT_APP_API_TOKEN}`
		);
		const data = await response.json();
		console.log(data);
	} catch {}
};

function App() {
	return <h1>Hello</h1>;
}

export default App;
