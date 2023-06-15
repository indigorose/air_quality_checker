import React, { useState } from 'react';

const CitySearch = ({ getAirQuality }) => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSearch = (event) => {
		event.preventDefault();
		const formattedCity = inputValue.replace(/ /g, '-');
		getAirQuality(formattedCity);
	};

	return (
		<form className="mb-4" onSubmit={handleSearch}>
			<input
				type="text"
				placeholder="Enter city here..."
				onChange={handleInputChange}
				className="form-control"
			/>
			<button className="btn btn-primary mt-3" type="submit">
				Search
			</button>
		</form>
	);
};

export default CitySearch;
