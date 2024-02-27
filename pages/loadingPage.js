import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Loading() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Načítám | Aplikace Přijmy a výdaje</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#4083E6" />
                <meta
                    name="description"
                    content="Osobní finanční aplikace."
                />
            </Head>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Přijmy a výdaje</h1>
                <div className={styles.logoWrapper}>
                    <img
                        className={styles.logo}
                        src="logo.png"
                        alt="App-Logo"
                    />
                </div>
            </div>
        </div>
    );
}
