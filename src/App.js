import React, { useState } from 'react';
import CitySearch from './CitySearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AirQualityCard from './AirQualityCard';
import PollutantInfo from './PollutantInfo';
import AirQualityLevels from './AirQualityLevels';
import CityLocationMap from './CityLocationMap';

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
			<h1 className="mt-5 mb-3">Air Quality Index Checker</h1>
			{/* This component will call the information from the API and we are passing the getAirQuality as its props(property) */}
			<CitySearch getAirQuality={getAirQuality} />
			{error && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}
			{airQualityData && (
				<>
					<AirQualityCard data={airQualityData} />
					<PollutantInfo pollutant={airQualityData.dominentpol} />
					<CityLocationMap
						location={airQualityData.city.geo}
						city={airQualityData.city.name}
					/>
				</>
			)}
			<AirQualityLevels />
		</div>
	);
}

export default App;
