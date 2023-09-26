import { useNavigate, useRouteLoaderData } from "react-router-dom";
import PageContent from "../components/PageContent";
import styles from "../components/PageContent.module.css";


function HomePage() {
    const navigate = useNavigate();
    const token = useRouteLoaderData('root');

    const onClickHandler = () => {
        if (!token) {
            navigate('/auth?mode=login');
        } else {
            navigate('/plants');
        }

    }

    const title = 'This is Garden App. '

    return <div >
        <PageContent title={title}>

            {!token ?
                <>
                    <p className={styles.text}>Create an account to start adding plants or log in to an existing account.</p>
                    <button className={styles.contentButton} onClick={onClickHandler}>Login and registration</button>
                </>
                : <>
                    <p className={styles.text}>Welcome to Garden App! View your own plants and add new ones.</p>
                    <button className={styles.contentButton} onClick={onClickHandler}>View your plants</button>
                </>

            }

        </PageContent>

    </div>
};

export default HomePage;