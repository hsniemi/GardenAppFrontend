
import { Form, Link, useSearchParams, useActionData, useNavigation } from "react-router-dom";
import styles from './AuthForm.module.css';
import { useState } from "react";

function AuthForm() {
    const data = useActionData();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';

    return <Form method="post" className={styles.form} >
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && <p>{data}</p>}
        <p>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
        </p>
        <p>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" placeholder="Password min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} required />
        </p>
        <div className={styles.actions}>
            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                {isLogin ? 'Create new user' : 'Login'}
            </Link>
            <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Send'}</button>
        </div>
    </Form>
}

export default AuthForm;