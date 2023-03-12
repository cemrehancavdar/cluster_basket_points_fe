import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './App.css';
function App() {
  const [points, setPoints] = useState([]);

  function getRandomColor(number) {
    const colorSeed = number * 23; // Use a deterministic number to seed the random color generator
    const hue = colorSeed % 360; // Use the number to determine the hue
    const saturation = 75; // Use a fixed saturation value
    const lightness = 50; // Use a fixed lightness value
    console.log(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Return the color in HSL format
  }

  useEffect(() => {
    const fetchPoints = async () => {
      const response = await fetch('https://cluster-basket-points.onrender.com/cluster?count=500', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPoints(data.features);
    };
    fetchPoints();
  }, []);
  return (
    <div className="App">
      <MapContainer center={[41.11, 29.02]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points &&
          points.map((point) => (
            <CircleMarker
              key={point.properties.id}
              center={[
                point.geometry.coordinates[1],
                point.geometry.coordinates[0],
              ]}
              radius={5}
              fillColor={getRandomColor(point.properties.cluster)}
              fillOpacity={1}
              stroke={false}
            >
              <Tooltip>{point.properties.cluster}</Tooltip>
            </CircleMarker>
          ))}
      </MapContainer>
    </div>
  );
}

export default App;
