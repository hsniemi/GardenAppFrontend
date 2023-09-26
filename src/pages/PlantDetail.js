import { json, redirect, useRouteLoaderData } from "react-router-dom";
import PlantItem from "../components/PlantItem";
import axios from "axios";
import { getAuthToken } from '../util/auth';
import Constants from '../Constants.json'

function PlantDetailPage() {
    const { plant } = useRouteLoaderData('detail');

    return <PlantItem plant={plant} />

}

export default PlantDetailPage;

export async function loader({ params }) {
    const token = getAuthToken();

    const id = params.plantId;

    const url = Constants.API_ADDRESS + "plants/" + id;

    try {
        const response = await axios.get(url,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log('plant detail loader: ' + response.data.name);
        return {
            plant: response.data
        };

    } catch (err) {
        console.log(err);
        throw json(
            { message: 'Could not get the plant.' },
            {
                status: 500,
            }
        );
    }
}

export async function action({ params }) {
    const id = params.plantId;

    const url = Constants.API_ADDRESS + "plants/" + id;
    const token = getAuthToken();

    try {
        await axios.delete(url,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            });
    } catch (err) {
        console.log(err);
        throw json(
            { message: 'Could not delete plant.' },
            {
                status: 500,
            }
        );
    }
    return redirect("/plants");
}