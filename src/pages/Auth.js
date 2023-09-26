import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import Constants from '../Constants.json'

function AuthPage() {
    return <AuthForm />
}

export default AuthPage;

export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Unsupported mode.' }, { status: 422 });
    }


    const data = await request.formData();

    const username = data.get('email');
    const passwd = data.get('password');

    const authData = {
        userName: username,
        password: passwd,
    };

    var credentials = btoa(authData.userName + ':' + authData.password);
    var basicAuth = 'Basic ' + credentials;
    console.log(basicAuth);

    if (mode === 'login') {
        console.log('loggin in');

        const response = await axios.post(Constants.API_ADDRESS + mode, null,
            {
                headers: {
                    'Authorization': basicAuth,
                    'Content-Type': 'application/json'
                }
            });

        if (response.status === 403) {
            throw json({ message: 'Invalid username or password!' }, { status: 403 });
        }


        if (response.status !== 200) {
            throw json({ message: 'Could not authenticate user' }, { status: 500 });
        }

        const token = response.data.access_token;
        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 3);
        localStorage.setItem('expiration', expiration.toISOString());

        return redirect("/");

    } else {
        const response = await fetch(Constants.API_ADDRESS + mode,
            {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authData)
            });

        if (response.status === 422 || response.status === 400) {
            return response;
        }

        if (!response.ok) {
            throw json({ message: 'Could not create user.' }, { status: 500 });
        }
        return redirect('/');
    }
}

