import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../services/auth";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
    const { user } = useAuth();
    return (
        <main className={styles.container}>
            <Head>
                <title>Přijmy a výdaje</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#4083E6" />
                <meta
                    name="description"
                    content="Osobní finanční aplikace."
                />
            </Head>
            <div>
                <h1 className={styles.title}>Vítejte v aplikaci Přijmy a výdaje!</h1>
                <div className={styles.logoWrapper}>
                    <img
                        className={styles.logo}
                        src="logo.png"
                        alt="App-Logo"
                    />
                </div>
                <h4 className={styles.phrase}>
                    Přihlašte se prosím nebo si zaregistrujte účet
                </h4>
                <div className={styles.linkBtnWrapper}>
                    <div className={styles.linkBtn}>
                        <Link href="/login">Přihlásit</Link>
                    </div>
                    <div className={styles.linkBtn}>
                        <Link href="/signup">Registrace</Link>
                    </div>
                </div>
            </div>
            <div style={{ justifyContent: "center", marginTop: 35 }}>
                <span
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <FontAwesomeIcon
                        icon={faCode}
                        style={{
                            width: "25px",
                            marginRight: "15px",
                            color: "#000000",
                        }}
                    />
                    <p style={{ fontWeight: "400", color: "#000000" }}>
                    Copyright © 2023{" "}
                        <Link href="https://github.com/ondrejchladek">
                            <a
                                style={{ fontWeight: "700", color: "#000000" }}
                                target="_blank"
                                rel="noopener noreferrer">
                                Ondřej Chládek
                            </a>
                        </Link>
                    </p>
                </span>
            </div>
        </main>
    );
}
