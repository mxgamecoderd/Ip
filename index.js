// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (your HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Function to get battery status (Dummy data for now)
function getBatteryStatus() {
    return { percent: 55 }; // Dummy value
}

// Function to get IP location
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

// Function to get current time
function getCurrentTime() {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// API endpoint to get device info
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
