import React, { useEffect, useState } from "react";
import Metolib from "@fmidev/metolib";
import "./App.css";
import L from "leaflet";
import Sidebar from "./components/Sidebar.jsx";
import MapView from "./components/MapView";
import Chart from "./components/Chart";

// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

function App() {
  const [observationLocations, setObservationLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(function fetchObservationLocations() {
    const connection = new Metolib.WfsConnection();
    if (
      connection.connect(
        "http://opendata.fmi.fi/wfs",
        "fmi::observations::weather::cities::multipointcoverage"
      )
    ) {
      connection.getData({
        begin: Date.now() - 60e3 * 60 * 24 * 6,
        end: Date.now(),
        requestParameter: "t,snowdepth,r_1h",
        timestep: 60 * 60 * 1000,
        bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
        callback: (data, errors) => {
          if (errors.length > 0) {
            errors.forEach(err => {
              console.error("FMI API error: " + err.errorText);
            });
            return;
          }

          setObservationLocations(
            data.locations.map(loc => {
              const [lon, lat] = loc.info.position.map(parseFloat);
              return { ...loc, position: { lat, lon } };
            })
          );

          connection.disconnect();
        }
      });
    }
  }, []);

  function handleSelectedLocation(id) {
    console.log("Selected ID: " + id);
    setSelectedLocation(id);
  }
  function handleReset() {
    setSelectedLocation(null);
  }

  return (
    <div className="App">
      <Sidebar
        selectedLocationId={selectedLocation}
        observationLocations={observationLocations}
        setSelectedLocation={handleSelectedLocation}
      />
      <MapView
        selectedLocationId={selectedLocation}
        observationLocations={observationLocations}
        setSelectedLocation={handleSelectedLocation}
      />
      <Chart
        selectedLocationId={selectedLocation}
        observationLocations={observationLocations}
        resetSelectedLocation={handleReset}
      />
    </div>
  );
}

export default App;
