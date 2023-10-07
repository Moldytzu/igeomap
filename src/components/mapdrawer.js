import React from "react";
import { TbHome } from 'react-icons/tb';
import { Link } from "react-router-dom";

const pages = [
    { title: "Homepage", path: '/', icon: TbHome },
]

function MapDrawer({ children, location }) {

    console.log(location)
    return (
        <div className="drawer">
            <input id="map_drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="map_drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}

                    {pages.map((page) => (
                        <li >
                            <Link to={page.path} className={page.path == location.pathname ? 'active' : ''}>
                                <page.icon size={23} className="inline-block" /> {page.title}
                            </Link>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}

export default MapDrawer;