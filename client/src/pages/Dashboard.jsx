// src/components/DashboardLayout.js
//import { Link } from 'react-router-dom';
import { Outlet, NavLink } from "react-router-dom";
import React from "react";
import menu from "../img/report.png";
import reco from "../img/notebook.png";
import sale from "../img/calculator.png";
import man from "../img/manager.png";
import set from "../img/setting.png";
import ret2 from "../img/ret2.png";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="w-full lg:w-64 bg-[#1c4532]   p-4 lg:p-6">
        <div className="flex gap-0">
          <div>
            <h2 className="text-left text-2xl uppercase text-white ml-0  font-family: 'Arial', opacity-85 sans-serif mb-2 mt-12">
              Distribution dashboard
            </h2>
            <hr className="bg-black h-0 opacity-50" />
          </div>
        </div>

        <nav className="mt-10">
          <ul>
            <li className="mb-4">
              <NavLink
                to="/dashboard/dash"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 text-white text-lg font-family: 'Arial', sans-serif border-none border-transparent rounded-lg bg-green-700 p-3"
                    : "flex items-center gap-3 text-gray-300 text-lg font-family: 'Arial', sans-serif p-3 hover:text-white"
                }
                style={({ isActive }) =>
                  isActive ? { borderColor: "#055f08" } : {}
                }
              >
                <img src={menu} alt="menu icon" className="w-6 h-6" />{" "}
                {/* Icon */}
                Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/dashboard/manageemp"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 text-white text-lg font-family: 'Arial', sans-serif border-none border-transparent rounded-lg bg-green-800 p-3"
                    : "flex items-center gap-3 text-gray-300 text-lg font-family: 'Arial', sans-serif p-3 hover:text-white"
                }
                style={({ isActive }) =>
                  isActive ? { borderColor: "#055f08" } : {}
                }
              >
                <img src={man} alt="menu icon" className="w-6 h-6" />{" "}
                {/* Icon */}
                Agencies
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/dashboard/record"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 text-white text-lg font-family: 'Arial', sans-serif border-none border-transparent rounded-lg bg-green-800 p-3"
                    : "flex items-center gap-3 text-gray-300 text-lg font-family: 'Arial', sans-serif p-3 hover:text-white"
                }
                style={({ isActive }) =>
                  isActive ? { borderColor: "#055f08" } : {}
                }
              >
                <img src={reco} alt="menu icon" className="w-6 h-6" />{" "}
                {/* Icon */}
                Records
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/dashboard/Product"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 text-white text-lg font-family: 'Arial', sans-serif border-none border-transparent rounded-lg bg-green-800 p-3"
                    : "flex items-center gap-3 text-gray-300 text-lg font-family: 'Arial', sans-serifv p-3 hover:text-white"
                }
                style={({ isActive }) =>
                  isActive ? { borderColor: "#055f08" } : {}
                }
              >
                <img src={sale} alt="menu icon" className="w-6 h-6" />{" "}
                {/* Icon */}
                Sales
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/dashboard/returns"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 text-white text-lg font-family: 'Arial', sans-serif border-none border-transparent rounded-lg bg-green-800 p-3"
                    : "flex items-center gap-3 text-gray-300 text-lg font-family: 'Arial', sans-serif p-3 hover:text-white"
                }
                style={({ isActive }) =>
                  isActive ? { borderColor: "#055f08" } : {}
                }
              >
                <img src={ret2} alt="returns icon" className="w-6 h-6" />{" "}
                Returns
              </NavLink>
            </li>
            <li className="mb-5 flex items-center gap-3 text-gray-300 text-lg font-family: 'Arial', sans-serif p-3 hover:text-white">
              <img src={set} alt="setting icon" className="w-6 h-6" />{" "}
              Settings
            </li>
          </ul>
        </nav>
        <hr className="bg-black h-0 opacity-50" />

        <button className="w-44 h-10 hover:text-red-400 uppercase text-gray-300 font-family:'Arial', sans-serif rounded-lg bg-green-800 shadow-sm mt-10">
          Logout
        </button>
      </aside>
      <main className="flex-1 py-4 px-6">
        <Outlet />
      </main>
    </div>
  );
}
