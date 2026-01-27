import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import "../../styles/layout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
