import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
    faBars,
    faTimes,
    faChartBar,
    faPlus,
    faHome,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar() {
    async function loggingOut() {
        try {
            await firebase.auth().signOut();
            console.log("logged out!");
            Router.push("/");
        } catch (err) {
            alert("Něco je špatně!", err.message);
            console.log("Něco je špatně!", err.message);
        }
    }

    const [click, setClick] = useState(false);

    const handleClick = () => {
        if (screen.width <= 426) {
            setClick(!click);
        }
    };
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <ul className={click ? styles.navMenuActive : styles.navMenu}>
                    <li className={styles.navItem}>
                        <Link href="/dashboard">
                            <a
                                activeclassname={styles.active}
                                className={styles.navLinks}
                                onClick={handleClick}>
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className={styles.icons}
                                />
                                Dashboard
                            </a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/addTransaction">
                            <a
                                activeclassname={styles.active}
                                className={styles.navLinks}
                                onClick={handleClick}>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className={styles.icons}
                                />
                                Nová transakce
                            </a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/analyticsPage">
                            <a
                                activeclassname={styles.active}
                                className={styles.navLinks}
                                onClick={handleClick}>
                                <FontAwesomeIcon
                                    icon={faChartBar}
                                    className={styles.icons}
                                />
                                Analytické shrnutí
                            </a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            activeclassname={styles.active}
                            className={styles.navLinks}
                            onClick={loggingOut}>
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                className={styles.icons}
                            />
                            Odejít
                        </a>
                    </li>
                </ul>
                <div className={styles.navIcon} onClick={handleClick}>
                    {click ? (
                        <FontAwesomeIcon icon={faTimes} width={"25px"} />
                    ) : (
                        <FontAwesomeIcon icon={faBars} width={"25px"} />
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
