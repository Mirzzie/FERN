const express = require('express');
const { getDatabase, ref, set, get, child } = require('firebase/database');
const { initializeApp } = require('firebase/app');
const bodyParser = require('body-parser');
const cors = require('cors');
// const firebaseConfig = require('./firebaseConfig');


const firebaseConfig = {
    apiKey: "AIzaSyBNQMYdbUEViU-odYZ9dNwHhSVwM2qY56M",
    authDomain: "prototype-335f9.firebaseapp.com",
    databaseURL: "https://prototype-335f9-default-rtdb.firebaseio.com",
    projectId: "prototype-335f9",
    storageBucket: "prototype-335f9.appspot.com",
    messagingSenderId: "507807737426",
    appId: "1:507807737426:web:59d203498c1551617fe18b",
    measurementId: "G-RFTR08W72C"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getDatabase(app);

const server = express();
server.use(bodyParser.json());
server.use(cors());

// Route to receive accelerometer data
server.post('/sensor-data', async (req, res) => {
    const { timestamp, xAcceleration, yAcceleration, zAcceleration } = req.body;

    try {
        await set(ref(analytics, `Sensor/X/${timestamp}`), xAcceleration);
        await set(ref(analytics, `Sensor/Y/${timestamp}`), yAcceleration);
        await set(ref(analytics, `Sensor/Z/${timestamp}`), zAcceleration);
        res.status(200).send('Data saved successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to get all sensor data
server.get('/sensor-data', async (req, res) => {
    try {
        const dbRef = ref(analytics);
        const snapshot = await get(child(dbRef, 'Sensor'));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).send('No data available');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
