import fetch from 'node-fetch';  // Correct for version 3 (ESM)

// Function to calculate distance and time between two locations (staff and client)
async function calculateDistanceAndDuration(staffLat, staffLng, clientLat, clientLng) {
    const mapboxToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Your Mapbox token
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${staffLng},${staffLat};${clientLng},${clientLat}?access_token=${mapboxToken}`;

    try {
        const response = await fetch(directionsUrl);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
            const distance = data.routes[0].distance;  // Distance in meters
            const duration = data.routes[0].duration;  // Duration in seconds

            const distanceInMiles = (distance / 1609.34).toFixed(2);  // Convert meters to miles
            const durationInMinutes = (duration / 60).toFixed(0);  // Convert seconds to minutes

            return { distanceInMiles, durationInMinutes };
        } else {
            throw new Error('No route found');
        }
    } catch (error) {
        console.error('Error calculating distance and duration:', error);
    }
}

// Example usage:
calculateDistanceAndDuration(40.748817, -73.985428, 40.730610, -73.935242)
    .then(result => console.log(result));
