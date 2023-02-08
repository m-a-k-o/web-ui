import { useEffect } from 'react';
import { useState } from 'react';
import './MapsIndoorsMap.scss';
import Map from "../Map/Map";
import SplashScreen from '../SplashScreen/SplashScreen';
import VenueSelector from '../VenueSelector/VenueSelector';
import BottomSheet from '../BottomSheet/BottomSheet';
import { MapsIndoorsContext } from '../../MapsIndoorsContext';

const mapsindoors = window.mapsindoors;
let startTime = new Date();
let timeAfterDataIsLoaded;
let timeToLoadData;

/**
 *
 * @param {Object} props
 * @param {string} props.apiKey - MapsIndoors API key or solution alias.
 * @param {string} [props.gmApiKey] - Google Maps API key if you want to show a Google Maps map.
 * @param {string} [props.mapboxAccessToken] - Mapbox Access Token if you want to show a Google Maps map.
 * @param {string} [props.venue] - If you want the map to show a specific Venue, provide the Venue name here.
 * @param {string} [props.locationId] - If you want the map to show a specific Location, provide the Location ID here.
 * @param {string} [props.primaryColor] - If you want the splash screen to have a custom primary color, provide the value here.
 * @param {string} [props.logo] - If you want the splash screen to have a custom logo, provide the image path or address here.
 */
function MapsIndoorsMap({ apiKey, gmApiKey, mapboxAccessToken, venue, locationId, primaryColor, logo }) {

    const [isMapReady, setMapReady] = useState(false);
    const [venues, setVenues] = useState([]);
    const [currentVenueName, setCurrentVenueName] = useState();
    const [currentLocation, setCurrentLocation] = useState();
    const [mapsIndoorsInstance, setMapsIndoorsInstance] = useState();

    /*
     * React on changes in the venue prop.
     */
    useEffect(() => {
        setCurrentVenueName(venue);
    }, [venue]);

    /**
     * React on changes to the locationId prop: Set as current location and make the map center on it.
     */
    useEffect(() => {
        if (locationId) {
            mapsindoors.services.LocationsService.getLocation(locationId).then(location => {
                if (location) {
                    setCurrentLocation(location);
                }
            });
        }
    }, [locationId]);

    /*
     * React on changes in the MapsIndoors API key.
     * Set the map to be in a ready state when the data has loaded.
     */
    useEffect(() => {
        setMapReady(false);
        mapsindoors.MapsIndoors.setMapsIndoorsApiKey(apiKey);

        // Fetch venue information when we know data is loaded and set the map to be in a ready state.
        mapsindoors.services.LocationsService.once('update_completed', () => {

            const fakePromise = new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 6000);
            })

            // Fixme: Venue Images are currently stored in the AppConfig object. So we will need to read the AppConfig as well as the list of Venues.
            // This will be changed in the future.

            Promise.all([mapsindoors.services.VenuesService.getVenues(), mapsindoors.services.AppConfigService.getConfig(), fakePromise]).then(([venuesResult, appConfigResult, _]) => {
                venuesResult = venuesResult.map(venue => {
                    venue.image = appConfigResult.venueImages[venue.name.toLowerCase()];
                    return venue;
                });

                setVenues(venuesResult);

                timeAfterDataIsLoaded = new Date();
                timeToLoadData = (timeAfterDataIsLoaded - startTime) / 1000;

                console.log('current time', startTime)
                console.log('time after data is loaded', timeAfterDataIsLoaded)
                console.log('time to load data', timeToLoadData);

                if (timeToLoadData >= 3) {
                    setMapReady(true);
                } else {
                    setTimeout(() => {
                        setMapReady(true);
                    }, 3000);
                }
            });
        });
    }, [apiKey]);

    return (<MapsIndoorsContext.Provider value={mapsIndoorsInstance}>
        <div className="mapsindoors-map">
            {!isMapReady && <SplashScreen logo={logo} primaryColor={primaryColor} className={isMapReady ? 'ready' : ''} />}
            {venues.length > 1 && <VenueSelector onVenueSelected={selectedVenue => setCurrentVenueName(selectedVenue.name)} venues={venues} currentVenueName={currentVenueName} />}
            {isMapReady && <BottomSheet currentLocation={currentLocation} onClose={() => setCurrentLocation(null)} />}
            <Map apiKey={apiKey} gmApiKey={gmApiKey} mapboxAccessToken={mapboxAccessToken} venues={venues} venueName={currentVenueName} onMapsIndoorsInstance={(instance) => setMapsIndoorsInstance(instance)} onLocationClick={(location) => setCurrentLocation(location)} />
        </div>
    </MapsIndoorsContext.Provider>)
}

export default MapsIndoorsMap;
