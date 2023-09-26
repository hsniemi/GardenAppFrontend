import styles from './PlantsList.module.css';
import { Link } from "react-router-dom";


function PlantsList({ plantList }) {

    return (
        <div className={styles.plants}>
            {plantList && plantList.length === 0 ?
                <p className={styles.empty}>You have no saved plants.</p>
                : <ul className={styles.list}>
                    {plantList && plantList.map((plant) => (
                        <li key={plant.id} className={styles.item}>
                            <Link to={`/plants/${plant.id}`}>
                                <img className={styles.photo} src={plant.image} alt={plant.name} />
                                <div className={styles.content}>
                                    <h2>{plant.name}</h2>
                                    <p className={styles.itemtitle}>Planted: </p>
                                    <time>{plant.date}</time>
                                    <p className={styles.itemtitle}>Care instructions: </p>
                                    <p>{plant.instructions}</p>
                                </div>
                            </Link>
                        </li>
                    ))}

                </ul>
            }

        </div>
    );
}

export default PlantsList;

