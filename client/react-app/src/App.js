import React, { useEffect, useState } from "react";

const App = () => {
  const [sensorData, setSensorData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sensor-data');
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSensorData();
  }, []);

  return (
    <div>
      <h1>Sensor Data</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : !sensorData ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>X Axis</h2>
          {Object.entries(sensorData.X).map(([timestamp, value]) => (
            <p key={timestamp}>
              {timestamp}: {value}g
            </p>
          ))}
          <h2>Y Axis</h2>
          {Object.entries(sensorData.Y).map(([timestamp, value]) => (
            <p key={timestamp}>
              {timestamp}: {value}g
            </p>
          ))}
          <h2>Z Axis</h2>
          {Object.entries(sensorData.Z).map(([timestamp, value]) => (
            <p key={timestamp}>
              {timestamp}: {value}g
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
