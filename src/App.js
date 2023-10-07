import MapDrawer from "./components/mapdrawer";
import { useLocation } from "react-router";
import MapNavbar from "./components/mapnavbar";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, FeatureGroup, Rectangle, LayersControl, ImageOverlay } from 'react-leaflet';
import GranulePopup from "./components/mapgranulepopup";

function App() {
  const clocation = useLocation();
  const center = [46, 24] // Romania
  const granules = [
    {
      coord: [
        [46.9997222, 25.0002778],
        [48.0002778, 23.99972222],
      ], text: "r1",
      granuleNumber: 1,
      image: "https://e4ftl01.cr.usgs.gov//WORKING/BRWS/Browse.001/2014.11.20/N47E024.SRTMGL1.2.jpg"
    },
    {
      coord: [
        [46.9997222, 24.9997222],
        [48.0002778, 26.0002778],
      ],
      granuleNumber: 2,
      text: "r2",
      image: "https://e4ftl01.cr.usgs.gov//WORKING/BRWS/Browse.001/2014.11.20/N47E025.SRTMGL1.2.jpg"
    },
  ]

  return (
    <div className="App">
      <MapDrawer location={clocation}>
        <MapNavbar />

        <MapContainer style={{ zIndex: 0 }} className="markercluster-map" center={center} zoom={7} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl position="topright">


            <LayersControl.Overlay checked={true} name="Nasa Imagery">

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

          </LayersControl>
        </MapContainer>,
      </MapDrawer>
    </div>
  );
}

export default App;