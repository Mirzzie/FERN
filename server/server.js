require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');
const firebaseConfig = require('../db/firebaseConfig');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

app.use(cors());
app.use(express.json());

// Route to fetch sensor data
app.get('/api/sensor-data', (req, res) => {
    const sensorRef = ref(database, 'Sensor');
    onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    }, (error) => {
        res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
