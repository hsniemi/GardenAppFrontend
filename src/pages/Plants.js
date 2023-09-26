import axios from "axios";
import PlantsList from "../components/PlantsList";
import { json, redirect, useLoaderData } from "react-router-dom";
import { getAuthToken } from '../util/auth';
import Constants from '../Constants.json'

function PlantsPage() {
    const plants = useLoaderData();

    return <PlantsList plantList={plants} />
}

export default PlantsPage;

export async function loader() {
    const url = Constants.API_ADDRESS + "plants";
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth?mode=login');
    }

    try {
        const response = await axios.get(url,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            }
        );
        //parse dates in plant list to a different format.
        for (let i = 0; i < response.data.length; i++) {
            const date = new Date(response.data[i].date);
            const day = date.getDate();
            const month = (date.getMonth() + 1);
            const year = date.getFullYear();

            const parsedDate = day + "." + month + "." + year;
            response.data[i].date = parsedDate;
        }
        return response.data;

    } catch (err) {
        throw json(
            { message: 'Could not get plants.' },
            {
                status: 500,
            }
        );
    }
}