import { Outlet } from "react-router-dom";
import ActionBar from "../../components/action-bar/action-bar";
import Header from "../../components/header/header";

export default function MainLayout() {
  return (
    <div className="w-full">
        <Header />

        <div className="z-50">
            <Outlet />
        </div>

        <ActionBar />
    </div>
  )
}
