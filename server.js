// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

// Function to get battery status (dummy function for API)
function getBatteryStatus() {
    return { percent: 55 }; // Dummy value for now
}

// Function to get IP location using an API
async function getIpLocation() {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        return {
            city: response.data.city,
            country: response.data.country_name,
        };
    } catch (error) {
        return { city: 'Unknown', country: 'Unknown' };
    }
}

// Function to get the current time
function getCurrentTime() {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// API endpoint to fetch all info
app.get('/api/device-info', async (req, res) => {
    const batteryStatus = getBatteryStatus();
    const ipLocation = await getIpLocation();
    const currentTime = getCurrentTime();

    res.json({
        batteryStatus,
        ipLocation,
        currentTime,
    });
});

// Serve the frontend (HTML) from the root
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
