import { TbArrowRight, TbWorld } from "react-icons/tb";
import { Popup } from "react-leaflet";
import { Link } from "react-router-dom";

export default function GranulePopup({ granule }) {
    return (
        <Popup>
            <h1 className="text-2xl font-bold">Granule #{granule.granuleNumber}</h1>
            <h2><TbWorld className="inline-block" /> {`${granule.coord[0]}, ${granule.coord[1]},`}</h2>

            <Link to={`/granule/${granule.granuleNumber - 1}/details`} className="btn btn-primary mt-5">View details <TbArrowRight className="inline-block" /></Link>
        </Popup>
    )
}