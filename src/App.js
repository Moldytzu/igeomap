import MapDrawer from "./components/mapdrawer";
import { useLocation } from "react-router";
import MapNavbar from "./components/mapnavbar";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, FeatureGroup, Rectangle, LayersControl, ImageOverlay } from 'react-leaflet';
import GranulePopup from "./components/mapgranulepopup";
import granules from "./data/granules";

function App() {
  const clocation = useLocation();
  const center = [46, 24] // Romania

  return (
    <div className="App">
      <MapDrawer location={clocation}>
        <MapNavbar />

        <MapContainer style={{ zIndex: 0 }} className="markercluster-map" center={center} zoom={7} scrollWheelZoom={false} minZoom={7} maxBounds={[[52,10] /* Centrul Germaniei */,[40,38.5] /* Estul Turciei */]}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl position="topright">

            <LayersControl.Overlay checked={true} name="Date HTG preluate din NASA Shuttle Radar Topography Mission Global 1 arc second V003">

              <FeatureGroup pathOptions={{ color: 'rgba(128, 0, 128, 0.1)' }}>
                {granules.map((granule) => (
                  <>
                    <Rectangle bounds={granule.coord}>
                      <GranulePopup granule={granule} />
                    </Rectangle>

                    <ImageOverlay
                      url={granule.image}
                      bounds={granule.coord}
                      opacity={0.7}
                      zIndex={0}
                    />
                  </>

                ))}
              </FeatureGroup>

            </LayersControl.Overlay>

            <LayersControl.Overlay checked={true} name="Date despre tipurile de soluri preluate din SMAP data">

            </LayersControl.Overlay>

            <LayersControl.Overlay checked={true} name="Date despre tipurile de soluri preluate din MODIS data">

            </LayersControl.Overlay>

            <LayersControl.Overlay checked={true} name="Date despre resurse minerale preluate din Landsat 8 data">

            </LayersControl.Overlay>

          </LayersControl>
        </MapContainer>,
      </MapDrawer>
    </div>
  );
}

export default App;