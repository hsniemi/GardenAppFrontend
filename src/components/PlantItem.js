import styles from './PlantItem.module.css';
import { Link, useSubmit } from 'react-router-dom';

function PlantItem({ plant }) {
    const submit = useSubmit();

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure you want to delete this item?');

        if (proceed) {
            submit(null, { method: 'delete' });
        }
    }

    const date = new Date(plant.date);
    const day = date.getDate();
    const month = (date.getMonth() + 1);
    const year = date.getFullYear();

    const parsedDate = day + "." + month + "." + year;

    return (
        <article className={styles.plant}>
            <h1>{plant.name}</h1>
            <div >
                <h3>Planted</h3>
                <time>{parsedDate}</time>
                <h3>Care instructions</h3>
                <p>{plant.instructions}</p>
                <img src={plant.image} alt={plant.title} />
            </div>

            <menu className={styles.actions}>
                <Link to='edit'>Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
            </menu>
        </article>
    )
}

export default PlantItem;