import { useState } from "react";
import './Admin.css';
import Sidebar from "../components/Sidebar/Sidebar";

export default function Admin({ component: Component }) {
  const [sidebarStatus, setSidebarStatus] = useState(false);

  return (
    <div className="admin">
      <Sidebar sidebarStatus={setSidebarStatus}></Sidebar>
      <div className={`component-home ${!sidebarStatus ? "sidebar-open" : "sidebar-closed"}`} >
        <Component />
      </div>
    </div>
  );
}