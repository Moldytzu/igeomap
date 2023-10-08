import { Link, useParams } from "react-router-dom";
import MapNavbar from "../components/mapnavbar";
import { TbArrowDown, TbArrowRight, TbArrowUp, TbCircle, TbCircleFilled, TbDatabase, TbDatabaseLeak, TbDatabaseStar, TbFile3D, TbLocation, TbMap, TbMountain, TbPlane, TbSun, TbWorld, TbWorldStar } from "react-icons/tb";
import { useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Rectangle, LayersControl, ImageOverlay, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ImageZoom from "react-image-zooom";
import granules from "../data/granules";
import stylePropObject from "eslint-plugin-react/lib/rules/style-prop-object";

function Details({ granules, id }) {

    const center = [(granules[id].coord[0][0] + granules[id].coord[1][0]) / 2, (granules[id].coord[0][1] + granules[id].coord[1][1]) / 2];

    return (
        <div className="hero bg-base-200">

            <div className="hero bg-base-200 lg:mt-0" style={{ height: '100%' }}>
                <div className="hero-content flex-col xl:flex-row">
                    <div className="lg:text-left lg:pr-10">
                        <div className="tooltip cursor-help" data-tip={`Prefixul G#${granules[id].granuleNumber} se referă la numărul granulei preluate de pe Nasa Earthdata`}>
                            <h1 className="text-xl font-bold mb-2">G#{granules[id].granuleNumber} NASA Shuttle Radar Topography Mission Global 1 arc second V003</h1>
                        </div>
                        <p>{granules[id].text}</p>
                        <div className="divider" />
                        <div class="grid grid-cols-2 gap-2 md:gap-3">
                            <div className="card shadow-xl bg-base-100">
                                <div className="card-body">
                                    <h2 className="card-title text-sm md:text-xl"><TbCircleFilled className="inline-block" style={{ color: 'red' }} /> Punct alt. maximă</h2>
                                    <p className="font-bold text-3xl md:text-5xl mt-2">{granules[id].altmax}m</p>
                                    <div onClick={() => { }} className="badge cursor-pointer"><TbLocation className="inline-block mr-2" />{granules[id].coordaltmax[0]}, {granules[id].coordaltmax[1]}</div>
                                </div>
                            </div>
                            <div className="card shadow-xl bg-base-100">
                                <div className="card-body">
                                    <h2 className="card-title text-sm md:text-xl"><TbCircleFilled className="inline-block" style={{ color: 'green' }} /> Punct alt. minimă</h2>
                                    <p className="font-bold text-3xl md:text-5xl mt-2">{granules[id].altmin}m</p>
                                    <div onClick={() => { }} className="badge cursor-pointer"><TbLocation className="inline-block mr-2" />{granules[id].coordaltmin[0]}, {granules[id].coordaltmin[1]}</div>
                                </div>
                            </div>
                            <div className="card shadow-xl bg-base-100">
                                <div className="card-body">
                                    <h2 className="card-title text-sm md:text-xl"><TbMountain className="inline-block" /> Altitudine medie </h2>
                                    <p className="font-bold text-3xl md:text-5xl mt-2">{granules[id].altmed}m</p>
                                </div>
                            </div>
                            <div className="card shadow-xl bg-base-100 ">
                                <div className="card-body">
                                    <TbDatabaseStar className="inline-block" />
                                    <h2 className="card-title"> Date despre compoziția solului și resurse minerale</h2>
                                    <Link to={`/granule/${id}/soil_details`} className="btn-ghost text-xs text-blue-600">Navigează la date despre sol <TbArrowRight className="inline-block" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <MapContainer className="granule-map" center={center} zoom={9.40}  scrollWheelZoom={true} minZoom={8}>
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
                                            opacity={0.85}
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
                                                <p>Punctul de altiutudine minimă</p>
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
        <div className="hero text-center bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse justify-content-center">
                <div  className="max-w-3xl rounded-2xl shadow-2xl">

                <ImageZoom
                    src={granules[id].image3d}
                    alt={granules[id].coord}
                    zoom="300"
                />

                <p className="font-bold text-xl pb-2"><TbFile3D size={25} className="inline-block" /> N{granules[id].coord[0][0]}E0{granules[id].coord[0][1]}.hgt</p>
                </div>
            </div>
        </div>
    )
}

function SoilComp({ granules, id }) {
    const center = [(granules[id].coord[0][0] + granules[id].coord[1][0]) / 2, (granules[id].coord[0][1] + granules[id].coord[1][1]) / 2];

    return (
        <div className="hero bg-base-200">
            {JSON.stringify(granules[id].soilComp) == "[]" ? (
                <div className="hero bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold"><TbDatabaseLeak /></h1>
                            <p className="py-6 font-bold">Nu există date despre sol în teritoriul selectat.</p>
                        </div>
                    </div>
                </div>
            ) : (

                <div className="hero bg-base-200 lg:mt-0" style={{ height: '100%' }}>
                    <div className="hero-content flex-col xl:flex-row">
                        <div className="lg:text-left pr-10">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>Tipul Solului</th>
                                            <th>Locația</th>
                                            <th>Dataset Sursă</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {granules[id].soilComp.map((soil) => (
                                            <tr>
                                                <th>{soil.type}</th>
                                                <th>{soil.coord[0]}, {soil.coord[1]}</th>
                                                <th>{soil.dataset}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <MapContainer className="granule-map" center={center} zoom={9.40} scrollWheelZoom={true} minZoom={8}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LayersControl position="topright">

                                    <LayersControl.Overlay name={`Reprezentarea datelor htg pentru teritoriul G#${parseInt(id) + 1}`}>

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

                                    <LayersControl.Overlay checked={false} name={`Punctele extreme ale altitudinii din teritoriul G#${parseInt(id) + 1}`}>

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

                                    <LayersControl.Overlay checked={true} name={`Locațiile cu date despre sol din teritoriul G#${parseInt(id) + 1}`}>

                                        <FeatureGroup pathOptions={{ color: 'rgba(128, 0, 128, 0.20)' }}>

                                            {granules[id].soilComp.map((soilCompx) => (
                                                <Circle center={soilCompx.coord} pathOptions={{ color: 'blue', fillColor: 'blue', opacity: 1, fillOpacity: 1 }} radius={2000} stroke={false}>
                                                    <Popup>
                                                        <p className="font-bold text-xl">{soilCompx.type}</p>
                                                    </Popup>
                                                </Circle>
                                            ))}

                                        </FeatureGroup>

                                    </LayersControl.Overlay>




                                </LayersControl>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default function GranulePage() {
    const { id, page } = useParams();

    const granulePages = [
        { title: "Detalii generale despre teritoriu", icon: TbMap, page: 'details', element: Details },
        { title: "Model 3D al terenului", icon: TbMountain, page: 'elevation_model', element: ElevationModel },
        { title: "Date despre sol", icon: TbDatabaseStar, page: 'soil_details', element: SoilComp }
    ]

    useEffect(() => {
        localStorage.setItem('lastGranuleCoord', JSON.stringify(granules[id].coord));
    }, [])

    return (
        <>
            <MapNavbar centerClassName={"lg:hidden"} />
            <div className="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {granulePages.map((granulePage) => (
                        granulePage.page == page ? (
                            <granulePage.element granules={granules} id={id} />
                        ) : (<></>)
                    ))}
                    <div className="btm-nav lg:hidden">
                        {granulePages.map((granulePage) => (
                            <Link to={`/granule/${id}/${granulePage.page}`} className={`font-bold ${page == granulePage.page ? 'active' : ''}`}>
                                <granulePage.icon />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="drawer-side border-r-4 overflow-hidden">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content gap-4 ">
                        <Link to='/' className="btn btn-ghost normal-case font-bold text-xl"><TbWorldStar /> igeomap</Link>
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