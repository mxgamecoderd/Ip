const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (your HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming JSON data
app.use(express.json());

// API endpoint to get device info (receive data from the frontend)
app.post('/api/device-info', async (req, res) => {
    const { batteryStatus, ipLocation, currentTime } = req.body;

    if (!batteryStatus || !ipLocation || !currentTime) {
        return res.status(400).json({ error: 'Invalid data received' });
    }

    // Send the received data back
    res.json({
        batteryStatus,
        ipLocation,
        currentTime
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
