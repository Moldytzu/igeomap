import { Link, useParams } from "react-router-dom";
import MapNavbar from "../components/mapnavbar";
import { TbArrowDown, TbArrowRight, TbArrowUp, TbCircle, TbCircleFilled, TbDatabaseStar, TbLocation, TbMap, TbMountain, TbPlane, TbWorld } from "react-icons/tb";

import { MapContainer, TileLayer, FeatureGroup, Rectangle, LayersControl, ImageOverlay, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Details({ granules, id }) {

    const center = [(granules[id].coord[0][0] + granules[id].coord[1][0]) / 2, (granules[id].coord[0][1] + granules[id].coord[1][1]) / 2];

    return (
        <div className="hero bg-base-200">

            <div className="hero bg-base-200 lg:mt-0 mt-20">
                <div className="hero-content flex-col lg:flex-row gap-20">
                    <div className="lg:text-left pr-10">
                        <h1 className="text-xl font-bold mb-2">G#{granules[id].granuleNumber} NASA Shuttle Radar Topography Mission Global 1 arc second V003</h1>
                        <p>{granules[id].text}</p>
                        <div className="divider" />
                        <div class="grid grid-cols-2 gap-3">
                            <div className="card shadow-xl  bg-base-100 ">
                                <div className="card-body">
                                    <h2 className="card-title"><TbCircleFilled className="inline-block" style={{ color: 'red' }} /> Punct alt. maximă</h2>
                                    <div onClick={() => { }} className="badge cursor-pointer"><TbLocation className="inline-block mr-2" />{granules[id].coordaltmax[0]}, {granules[id].coordaltmax[1]}</div>
                                </div>
                            </div>
                            <div className="card shadow-xl bg-base-100">
                                <div className="card-body">
                                    <h2 className="card-title"><TbCircleFilled className="inline-block" style={{ color: 'green' }} /> Punct alt. minimă</h2>
                                    <div onClick={() => { }} className="badge cursor-pointer"><TbLocation className="inline-block mr-2" />{granules[id].coordaltmin[0]}, {granules[id].coordaltmin[1]}</div>

                                </div>
                            </div>
                            <div className="card shadow-xl bg-base-100 ">
                                <div className="card-body">
                                    <h2 className="card-title"><TbMountain className="inline-block" /> Altitudine medie </h2>
                                    <p className="font-bold text-5xl mt-2">{granules[id].altmed}m</p>
                                </div>
                            </div>
                            <div className="card shadow-xl bg-base-100 ">
                                <div className="card-body">
                                    <TbDatabaseStar className="inline-block" />
                                    <h2 className="card-title"> Date despre compoziția solului și resurse minerale</h2>
                                    <Link to={`/granule/${id}/soil_data`} className="btn-ghost text-xs text-blue-600">Navigează la date despre sol <TbArrowRight className="inline-block" /></Link>

                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <MapContainer className="granule-map" center={center} zoom={9.40} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LayersControl position="topright">

                                <LayersControl.Overlay checked={true} name={`Reprezentarea datelor htg pentru teritoriul G#${id + 1}`}>

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

                                <LayersControl.Overlay checked={true} name={`Punctele extreme ale altitudinii din teritoriul G#${id + 1}`}>

                                    <FeatureGroup pathOptions={{ color: 'rgba(128, 0, 128, 0.20)' }}>

                                        <Circle center={granules[id].coordaltmax} pathOptions={{ color: 'red', fillColor: 'red', opacity: 1, fillOpacity: 1 }} radius={2000} stroke={false}>
                                            <Popup>
                                                <p>Coordonatele punctului cel mai înalt de pe hartă</p>
                                            </Popup>
                                        </Circle>

                                        <Circle center={granules[id].coordaltmin} pathOptions={{ color: 'green', fillColor: 'green', opacity: 1, fillOpacity: 1 }} radius={2000} stroke={false}>
                                            <Popup>
                                                <p>Coordonatele punctului cel mai înalt de pe hartă</p>
                                            </Popup>
                                        </Circle>

                                    </FeatureGroup>

                                </LayersControl.Overlay>




                            </LayersControl>
                        </MapContainer>
                    </div>
                </div>
            </div>



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
        { title: "Detalii generale despre teritoriu", icon: TbMap, page: 'details', element: Details },
        { title: "Model 3D al terenului", icon: TbMountain, page: 'elevation_model', element: ElevationModel },
    ]

    const granules = [
        {
            coord: [
                [46.9997222, 25.0002778],
                [48.0002778, 23.99972222],
            ],
            text: "Reprezentare a datelor htg. Cuprinde domenii din județele Maramureș și Bistrița-Năsăud.",
            granuleNumber: 1,
            coordaltmax: [46.9997222, 25.0002778],
            coordaltmin: [48.0002778, 23.99972222],
            altmax: 2022,
            altmin: 20,
            altmed: 500,
            image: "https://e4ftl01.cr.usgs.gov//WORKING/BRWS/Browse.001/2014.11.20/N47E024.SRTMGL1.2.jpg",
            imagehr: "https://e4ftl01.cr.usgs.gov//WORKING/BRWS/Browse.001/2014.11.20/N47E024.SRTMGL1.2.jpg",
        },
        {
            coord: [
                [46.9997222, 24.9997222],
                [48.0002778, 26.0002778],
            ],
            text: "Reprezentare a datelor htg. Cuprinde domenii din județul Suceava.",
            granuleNumber: 2,
            coordaltmax: [46.9997222, 25.0002778],
            coordaltmin: [48.0002778, 23.99972222],
            altmax: 2022,
            altmin: 20,
            altmed: 500,
            image: "https://e4ftl01.cr.usgs.gov//WORKING/BRWS/Browse.001/2014.11.20/N47E025.SRTMGL1.2.jpg",
            imagehr: "https://e4ftl01.cr.usgs.gov//WORKING/BRWS/Browse.001/2014.11.20/N47E025.SRTMGL1.2.jpg"
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
                <div className="drawer-side border-r-4 overflow-hidden">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content gap-4 pt-20">

                        {/* Sidebar content here */}
                        {granulePages.map((granulePage) => (
                            <li><Link to={`/granule/${id}/${granulePage.page}`} className={`font-bold border-2 ${page == granulePage.page ? 'active' : ''}`}><granulePage.icon className="inline-block" /> {granulePage.title}</Link></li>
                        ))}
                    </ul>

                </div>
            </div>
        </>
    )
}