import * as Sentry from "@sentry/react";
import './App.css';
import MapsIndoorsMap from './components/MapsIndoorsMap/MapsIndoorsMap';

function App() {
    return (
        <div className="app">
            {/* This is the Map Template component */}
            <MapsIndoorsMap supportsUrlParameters={true}
                gmApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                mapboxAccessToken="pk.eyJ1IjoibWFwc3Blb3BsZSIsImEiOiJjbHVreTJ5bnAwcGZ3MmtuMmJreHZnYTdoIn0.-CiRhV-bpSR-p78ZTaYLJg"
            />
        </div>
    );
}

export default Sentry.withProfiler(App, { name: "App" });
