import { useRouteLoaderData } from 'react-router-dom';
import PlantForm from '../components/PlantForm';


function EditPlantPage() {
    const data = useRouteLoaderData('detail');

    return <PlantForm method="patch" plant={data.plant} />;
}

export default EditPlantPage;