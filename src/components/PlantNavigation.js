import { NavLink } from "react-router-dom";
import styles from './PlantNavigation.module.css';

function PlantNavigation() {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.list}>
                    <li >
                        <NavLink to="/plants" className={({ isActive }) => isActive ? styles.active : undefined}>All Plants</NavLink>
                    </li>
                    <li>
                        <NavLink to="/plants/new" className={({ isActive }) => isActive ? styles.active : undefined}>New Plant</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default PlantNavigation;