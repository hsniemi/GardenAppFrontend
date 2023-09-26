import { Outlet } from "react-router-dom";
import PlantNavigation from "../components/PlantNavigation";


function PlantRoot() {
    return (
        <>
            <PlantNavigation />
            <Outlet />
        </>
    )
}

export default PlantRoot;