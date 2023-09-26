import { Form, useNavigation, useNavigate, useActionData, redirect, json } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import styles from './PlantForm.module.css';
import { getAuthToken } from '../util/auth';
import Constants from '../Constants.json'


function PlantForm({ method, plant }) {
    const [previewSource, setPreviewSource] = useState("");
    const [fileInputState, setFileInputState] = useState("");
    const data = useActionData();
    const navigation = useNavigation();
    const navigate = useNavigate();


    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler() {
        navigate('..');
    }

    function handleImageChange(e) {
        previewFile(e.target.files[0]);
        setFileInputState(e.target.value);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    return (
        <Form method={method} encType="multipart/form-data" className={styles.form}>
            {data && <p>{data}</p>}
            <p>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" required defaultValue={plant ? plant.name : ''} />
            </p>
            {plant && <>
                <input id="hidden" type="hidden" name="hidden_id" value={plant.image_id ? plant.image_id : ""}></input>
                <input id="hidden" type="hidden" name="hidden_url" value={plant.image ? plant.image : ""}></input>
            </>

            }
            <p>
                <label htmlFor="image">Image</label>
                {plant ? <img
                    src={previewSource ? previewSource : plant.image}
                    alt=""
                    style={plant.image || previewSource ? { height: '150px' } : { height: '0px' }} /> : previewSource && <img
                        src={previewSource}
                        alt="chosen"
                        style={{ height: '150px' }} />
                }
                <input
                    id="image"
                    type="file"
                    name="image"
                    value={fileInputState}
                    onChange={handleImageChange} />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" required defaultValue={plant ? plant.date : ''} />
            </p>
            <p>
                <label htmlFor="instructions">Instructions</label>
                <textarea id="instructions" name="instructions" rows="5" required defaultValue={plant ? plant.instructions : ''} />
            </p>
            <div className={styles.actions}>
                <button className={styles.cancel} type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>
                <button className={styles.save} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
            </div>
        </Form>
    )
}

export default PlantForm;

async function uploadImage(file, token) {
    let url = Constants.API_ADDRESS + 'plants/addimage';

    try {
        let img_url = "";
        let img_id = "";
        const response = await axios.post(url, file,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                }
            });
        img_url = response.data.img_url;
        img_id = response.data.img_id;
        return {
            "img_url": img_url,
            "img_id": img_id,
        };
    } catch (err) {
        throw json({ message: 'Could not upload image.' }, { status: 500 });
    }
}

async function uploadData(url, data, token) {
    try {
        const response = await axios.post(url, data,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            });
        return response.data;

    } catch (err) {
        throw json({ message: 'Could not upload plant.' }, { status: 500 });
    }
}

async function updateData(url, data, token) {
    try {
        await axios.put(url, data,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            });

    } catch (err) {
        throw json({ message: 'Could not update plant.' }, { status: 500 });
    }
}


export async function action({ request, params }) {

    const data = await request.formData();
    const method = request.method;
    const token = getAuthToken();

    let url = Constants.API_ADDRESS + 'plants/addplant';

    let plantData = {
        name: data.get('name'),
        instructions: data.get('instructions'),
        date: data.get('date'),
        image: data.get('hidden_url'),
        image_id: data.get('hidden_id')
    };
    console.log(plantData);

    if (method === 'PATCH') {
        const plantId = params.plantId;
        url = Constants.API_ADDRESS + 'plants/addplant/' + plantId;

        if (data.get('image').name !== "") {
            const res = await uploadImage({ file: data.get('image'), img_id: data.get('hidden_id') }, token);

            plantData.image = res.img_url;
            plantData.image_id = res.img_id;
        }
        await updateData(url, plantData, token);
    }

    if (method === 'POST') {
        const fileObject = { file: data.get('image'), img_id: "" }

        if (data.get('image').name !== "") {
            const res = await uploadImage(fileObject, token);

            plantData.image = res.img_url;
            plantData.image_id = res.img_id;
        }
        await uploadData(url, plantData, token);
    }
    return redirect('/plants');

}