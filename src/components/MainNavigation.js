import { Form, NavLink, json, useSubmit, } from 'react-router-dom';
import styles from './MainNavigation.module.css';
import axios from 'axios';
import { getAuthToken } from '../util/auth';
import Constants from '../Constants.json'

function MainNavigation() {
    const token = getAuthToken();
    const submit = useSubmit();

    async function onDeleteHandler() {
        const proceed = window.confirm('Are you sure you want to delete your account?');

        if (proceed) {
            const url = Constants.API_ADDRESS + 'deleteuser';

            const response = await axios.delete(url,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

            submit(null, { action: '/logout', method: 'post' });

            if (response.status !== 200) {
                throw json({ message: 'Could not delete user.' }, { status: 500 });
            }
        }


    }

    return (
        <header className={styles.header}>

            <h1 className={styles.title}>Garden App</h1>
            <nav>
                <ul className={styles.list}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined} end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/plants" className={({ isActive }) => isActive ? styles.active : undefined}>Plants</NavLink>
                    </li>
                    {!token && <li className={styles.login}>
                        <NavLink to="/auth?mode=login" className={({ isActive }) => isActive ? styles.active : undefined}>Login</NavLink>
                    </li>}
                    {token && <ul className={styles.logoutList}>
                        <li className={styles.login}>
                            <Form action="/logout" method="post">
                                <button className={styles.logoutButton}>Logout</button>
                            </Form>
                        </li>
                        <li >

                            <button onClick={onDeleteHandler} className={styles.deleteUserButton}>Delete Account</button>

                        </li>
                    </ul>
                    }
                </ul>
            </nav>



        </header>

    );
}

export default MainNavigation;