import './App.css';
import React, { useState } from 'react';
import CitySearch from './CitySearch';

function App() {
	// Everything must happen inside the function.
	// This is a function to help us assign a value
	// set air quality data to null
	// eslint-disable-next-line no-unused-vars
	const [airQualityData, setAirQualityData] = useState(null);
	// set error state
	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState(null);
	// Using the Async functionality allows for a better communication with external API sources.
	const getAirQuality = async (city) => {
		try {
			const response = await fetch(
				`https://api.waqi.info/feed/${city}/?token=${process.env.REACT_APP_AIR_API_TOKEN}`
			);
			const data = await response.json();
			console.log(data);
			if (response.ok && data.status === 'ok') {
				setAirQualityData(data.data);
				setError(null);
			} else {
				setError(
					"Sorry, we couldn't find the city you were looking for. Try another location nearby or ensure your spelling is correct."
				);
				setAirQualityData(null);
			}
		} catch (error) {
			// We need to catch errors as things happen outside of our control
			console.error('network error: ', error);
			setError('Sorry, something went wrong.');
			setAirQualityData(null);
		}
	};
	return (
		<div className="container">
			<h1>Air Quality Index Checker</h1>
			{/* This component will call the information from the API and we are passing the getAirQuality as its props(property) */}
			<CitySearch getAirQuality={getAirQuality} />
		</div>
	);
}

export default App;
