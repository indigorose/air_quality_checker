import React from 'react';

function CityLocationMap({ location, city }) {
	// Create a function that will display a static map of the location requested.
	// const showLocation = async (location) => {
	//     try {
	//         const response = await fetch (`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${location[1]},${location[0]},12.15,0/600x400?access_token=${process.env.REACT_APP_MAP_API_TOKEN}`);
	//     }
	// }
	return (
		<div className="card mb-4">
			<div className="card-body">
				<h4 className="card-title">{city}</h4>
				<p>
					Longitude: {location[1].toFixed(4)}, Latitude:{' '}
					{location[0].toFixed(4)}
				</p>
				{/* <img src='{showLocation()}' alt="Map of city location" className="card" /> */}
			</div>
		</div>
	);
}

export default CityLocationMap;
