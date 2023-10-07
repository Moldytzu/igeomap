import { TbAirBalloon, TbInfoCircle, TbSelect, TbSelector, TbSquare, TbSquareArrowDown, TbSquareRoundedArrowDown, TbTools, TbWaveSquare } from "react-icons/tb";

export default function MapNavbar({ children, location }) {
    return (
        <div className="navbar bg-base-100 border-b-4 fixed top-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label htmlFor="map_drawer" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl"><TbAirBalloon /> iGeoMap</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <div className="tooltip tooltip-bottom" data-tip="Select granule">
                        <TbSelect size={23} />
                    </div>
                </button>

                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <TbInfoCircle size={23} />
                    </div>
                </button>
            </div>
        </div>
    )
}