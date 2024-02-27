import Head from "next/head";
import styles from "../styles/signup.module.css";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import initFirebase from "../services/firebaseClient";
import Router from "next/router";

initFirebase();

export default function SignUpPage() {
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const emptyState = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    async function registration(email, password, Name) {
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            const currentUser = firebase.auth().currentUser;
            console.log(currentUser.uid);
            const user = {
                uid: currentUser.uid,
                Name: Name,
                Email: email,
                Password: password,
            };
            const db = firebase.firestore();

            db.collection("users").doc(currentUser.uid).set(user);
            console.log(`${Name} has been registered.`);
        } catch (err) {
            alert("Something went wrong!", err.message);
            console.log(err.message);
        }
    }

    const handleSignup = () => {
        if (!Name) {
            alert("Jméno je vyžadováno.");
        } else if (!email) {
            alert("E-mail je vyžadován.");
        } else if (!password) {
            alert("Heslo je vyžadováno.");
        } else if (!confirmPassword) {
            setPassword("");
            alert("Potvrzení hesla je vyžadováno.");
        } else if (password !== confirmPassword) {
            alert("Heslo nesedí!");
        } else {
            registration(email, password, Name);
            Router.push("/");
            emptyState();
        }
    };

    return (
        <main className={styles.container}>
            <Head>
                <title>Sign up | CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#4083E6" />
                <meta
                    name="description"
                    content="Osobní finanční aplikace."
                />
            </Head>
            <div>
                <h1 className={styles.title}>Registrovat do aplikace!</h1>
                <div className={styles.Form}>
                    <label className={styles.formLabel}>Jméno</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        autocomplete="off"
                        placeholder="Zadejte Vaše jméno"
                        name="Name"
                        onChange={(Name) => setName(Name.target.value)}
                        required></input>
                    <label className={styles.formLabel}>E-mail</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        autocomplete="off"
                        placeholder="Zadejte Váš e-mail"
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
                    <label className={styles.formLabel}>Porvrzení hesla</label>
                    <input
                        className={styles.formInput}
                        type="password"
                        placeholder="Potvrďte heslo"
                        name="confirmPassword"
                        onChange={(confirmPassword) =>
                            setConfirmPassword(confirmPassword.target.value)
                        }
                        required></input>
                    <button
                        type="submit"
                        className={styles.formBtn}
                        onClick={handleSignup}>
                        Registrovat
                    </button>
                </div>
            </div>
        </main>
    );
}
