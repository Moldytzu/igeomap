import { Link, useParams } from "react-router-dom";
import MapNavbar from "../components/mapnavbar";
import { TbMap, TbMountain } from "react-icons/tb";

import { MapContainer, TileLayer, FeatureGroup, Rectangle, LayersControl, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Details({ granules, id }) {

    const center = [(granules[id].coord[0][0] + granules[id].coord[1][0]) / 2, (granules[id].coord[0][1] + granules[id].coord[1][1]) / 2];

    return (
        <div className="hero bg-base-100">

            <MapContainer className="granule-map" center={center} zoom={9.45} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position="topright">

                    <LayersControl.Overlay checked={true} name={`Granule number ${id + 1}`}>

                        <FeatureGroup pathOptions={{ color: 'rgba(128, 0, 128, 0.20)' }}>

                            <Rectangle bounds={granules[id].coord} />

                            <ImageOverlay
                                url={granules[id].image}
                                bounds={granules[id].coord}
                                opacity={0.7}
                                zIndex={0}
                            />

                        </FeatureGroup>

                    </LayersControl.Overlay>

                </LayersControl>
            </MapContainer>
        </div>
    )
}

function ElevationModel({ granules, id }) {
    return (
        <div className="hero bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div>

                </div>
            </div>
        </div>
    )
}

export default function GranulePage() {

    const { id, page } = useParams();

    const granulePages = [
        { title: "General Granule Details", icon: TbMap, page: 'details', element: Details },
        { title: "3D Terrain Elevation Model", icon: TbMountain, page: 'elevation_model', element: ElevationModel },
    ]

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
        <>
            <MapNavbar />
            <div className="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {granulePages.map((granulePage) => (
                        granulePage.page == page ? (
                            <granulePage.element granules={granules} id={id} />
                        ) : (<></>)
                    ))}
                </div>
                <div className="drawer-side border-r-4">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-4">
                        <h1 className="text-2xl">Granula numărul {id + 1}</h1>
                        <div className="divider" />
                        {/* Sidebar content here */}
                        {granulePages.map((granulePage) => (
                            <li><Link to={`/granule/${id}/${granulePage.page}`} className={`font-bold ${page == granulePage.page ? 'active' : ''}`}><granulePage.icon className="inline-block" /> {granulePage.title}</Link></li>
                        ))}
                    </ul>

                </div>
            </div>
        </>
    )
}