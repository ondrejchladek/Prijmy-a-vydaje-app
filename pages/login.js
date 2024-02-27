import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/login.module.css";
import firebase from "firebase/app";
import Link from "next/link";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";
import firebaseClient from "../services/firebaseClient";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginPage() {
    firebaseClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emptyState = () => {
        setEmail("");
        setPassword("");
    };

    async function signIn(email, password) {
        try {
            const response = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
            const { user, credentials } = response;

            console.log(`logged in as ${user.email}`);
            Router.push("/dashboard");
        } catch (err) {
            alert("Something went wrong!", err.message);
            console.log(`Error: ${err.message}`);
        }
    }

    const handleSignIn = () => {
        if (!email) {
            alert("Email je vyžadován.");
        } else if (!password) {
            alert("Heslo je vyžadováno.");
        } else {
            signIn(email, password);

            emptyState();
        }
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Přihlásit do aplikace Přijmy a výdaje!</h1>
            <Head>
                <title>Login | Přijmy a výdaje</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#4083E6" />
                <meta
                    name="description"
                    content="Osobní finanční apliakce."
                />
            </Head>
            <div>
                <div className={styles.Form}>
                    <label className={styles.formLabel}>E-mail</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        autocomplete="off"
                        placeholder="Zadejte e-mail"
                        name="email"
                        onChange={(email) => setEmail(email.target.value)}
                        required></input>
                    <label className={styles.formLabel}>Heslo</label>
                    <input
                        className={styles.formInput}
                        type="password"
                        placeholder="Zadejte heslo"
                        name="password"
                        onChange={(password) =>
                            setPassword(password.target.value)
                        }
                        required></input>
                    <button
                        type="submit"
                        onClick={handleSignIn}
                        className={styles.formBtn}>
                        Přihlásit
                    </button>
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
