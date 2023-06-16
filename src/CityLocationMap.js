import React from 'react';

function CityLocationMap({ location, city }) {
	// Create a function that will display a static map of the location requested.
	const longitude = location[1].toFixed(4);
	const latitude = location[0].toFixed(4);
	// // eslint-disable-next-line no-unused-vars
	// const [mapData, setMapData] = useState(null);
	// // eslint-disable-next-line no-unused-vars
	// const [error, setError] = useState(null);

	// const LocationMap = async (longitude, latitude) => {
	// 	try {
	// 		const response = await fetch(
	// 			`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},12,0/600x400?access_token=${process.env.REACT_APP_MAP_API_TOKEN}`
	// 		);
	// 		const data = await response.json();
	// 		console.log(data);
	// 		if (response.ok && data.status === 'ok') {
	// 			setMapData(data.data);
	// 			setError(null);
	// 		} else {
	// 			setError(
	// 				"Sorry, we couldn't find the city you were looking for. Try another location nearby or ensure your spelling is correct."
	// 			);
	// 			setMapData(null);
	// 		}
	// 	} catch (error) {
	// 		// We need to catch errors as things happen outside of our control
	// 		console.error('network error: ', error);
	// 		setError('Sorry, something went wrong.');
	// 		setMapData(null);
	// 	}
	// };

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h4 className="card-title">{city}</h4>
				<p>
					Longitude: {longitude}, Latitude: {latitude}
				</p>
				{/* <img
					src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},12,0/600x400?access_token=${process.env.REACT_APP_MAP_API_TOKEN}`}
					alt=""
				/> */}
			</div>
		</div>
	);
}

export default CityLocationMap;
