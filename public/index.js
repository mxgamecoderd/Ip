// Function to get battery status
async function getBatteryStatus() {
    const battery = await navigator.getBattery();
    return { percent: battery.level * 100, charging: battery.charging };
}

// Function to get IP Location
async function getIpLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return { city: data.city, country: data.country_name };
    } catch (error) {
        return { city: 'Unknown', country: 'Unknown' };
    }
}

// Function to get current time
function getCurrentTime() {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Function to update UI with all the information
async function displayDeviceInfo() {
    const batteryStatus = await getBatteryStatus();
    const ipLocation = await getIpLocation();
    const currentTime = getCurrentTime();

    // Update the UI with the information
    document.getElementById('batteryStatus').textContent = `${batteryStatus.percent}%`;
    document.getElementById('ipLocation').textContent = `${ipLocation.country}, ${ipLocation.city}`;
    document.getElementById('currentTime').textContent = currentTime;

    // Send data to the server (via API) if needed
    await fetch('http://localhost:3000/api/device-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            batteryStatus,
            ipLocation,
            currentTime
        })
    });
}

// Automatically load the information when the page loads
window.onload = function () {
    displayDeviceInfo();
};
