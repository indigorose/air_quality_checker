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
				`/.netlify/functions/getData?city=${city}`
			);

			const contentType = response.headers.get('content-type');
			if (!contentType || !contentType.includes('application/json')) {
				throw new Error(`Expected JSON, got: ${contentType}`);
			}

			const data = await response.json();

			if (response.ok && data) {
				setAirQualityData(data);
				setError(null);
			} else {
				setError("Couldn't fetch data. Try again.");
				setAirQualityData(null);
			}
		} catch (error) {
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
			{/* <img
			// src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4196,37.776,11.41,0/300x200?access_token=${process.env.REACT_APP_MAP_API_TOKEN}`}
			// alt=""
			/> */}
		</div>
	);
}

export default App;
