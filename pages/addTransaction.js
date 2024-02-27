import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../services/auth";
import nookies from "nookies";
import { verifyIdToken } from "../services/firebaseAdmin";
import firebaseClient from "../services/firebaseClient";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/AddTransaction.module.css";
import Loading from "./loadingPage";

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const { uid, email } = token;
        return {
            props: { session: `email: ${email}, uid: ${uid}` },
        };
    } catch (error) {
        console.log(error);
        return { props: [] };
    }
}

function AddTransaction() {
    const { user } = useAuth();
    firebaseClient();

    if (user != null) {
        const [state, setState] = useState({
            Description: "",
            Amount: "",
            Type: "",
            dateId: "",
            DateString: "",
            Category: "",
        });
        console.log(state);
        const createTransaction = async () => {
            let date = Date.now();
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth();
            let day = today.getDate();
            let hour = today.getHours();
            let minutes = today.getMinutes();

            if (month < 10) {
                month = "0" + (month + 1);
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            let category = "";

            let dateString =
                month + "-" + day + "-" + year + "  " + hour + ":" + minutes;

            if (state.Category == "") {
                category = "Ostatní";
            } else {
                category = state.Category;
            }

            if (
                state.Description == "" ||
                state.Amount == "" ||
                state.Type == ""
            ) {
                alert("Doplňte pole o * .");
            } else {
                const db = firebase.firestore();

                await db
                    .collection("users")
                    .doc(user.uid)
                    .collection("transactionsList")
                    .add({
                        Description: state.Description,
                        Amount: state.Amount,
                        Type: state.Type,
                        dateId: date,
                        DateString: dateString,
                        Category: category,
                    });
                alert("Přidána nová transakce!");
                Router.push("/dashboard");
            }
        };

        return (
            <main className={styles.container}>
                <Head>
                    <title>Přidat transakci | Přijmy a výdaje</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#4083E6" />
                    <meta
                        name="description"
                        content="Osobní finanční aplikace."
                    />
                </Head>
                <div>
                    <h1 className={styles.title}>Nová transakce</h1>
                    <div className={styles.Form}>
                        <label className={styles.formLabel}>Popis</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            autocomplete="off"
                            placeholder="Zadejte popis transakce"
                            onChange={(value) =>
                                setState({
                                    ...state,
                                    Description: value.target.value,
                                })
                            }
                            required></input>
                        <label className={styles.formLabel}>Částka</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            autocomplete="off"
                            placeholder="Zadejte částku"
                            name="numeric"
                            onChange={(value) =>
                                setState({
                                    ...state,
                                    Amount: value.target.value,
                                })
                            }
                            required></input>
                        <label className={styles.formLabel}>Typ</label>
                        <select
                            className={styles.formInput}
                            onChange={(value) =>
                                setState({
                                    ...state,
                                    Type: value.target.value,
                                })
                            }>
                            <option selected disabled hidden>
                                Vyberte typ
                            </option>
                            <option className={styles.Option} value="Příjem">
                                Příjem
                            </option>
                            <option className={styles.Option} value="Výdaj">
                                Výdaj
                            </option>
                        </select>
                        <label className={styles.formLabel}>Kategorie</label>
                        {state.Type == "Příjem" ? (
                            <select
                                className={styles.formInput}
                                onChange={(value) =>
                                    setState({
                                        ...state,
                                        Category: value.target.value,
                                    })
                                }>
                                <option selected disabled hidden>
                                    Vyberte kategorii
                                </option>
                                <option className={styles.Option} value="Práce">
                                    Práce
                                </option>
                                <option
                                    className={styles.Option}
                                    value="Investice">
                                    Investice
                                </option>
                                <option
                                    className={styles.Option}
                                    value="Ostatní">
                                    Ostatní
                                </option>
                            </select>
                        ) : (
                            <select
                                className={styles.formInput}
                                onChange={(value) =>
                                    setState({
                                        ...state,
                                        Category: value.target.value,
                                    })
                                }>
                                <option selected disabled hidden>
                                Vyberte kategorii
                                </option>
                                <option className={styles.Option} value="Jídlo">
                                    Jídlo
                                </option>
                                <option className={styles.Option} value="Složenky">
                                    Složenky
                                </option>
                                <option
                                    className={styles.Option}
                                    value="Auto">
                                    Auto
                                </option>
                                <option
                                    className={styles.Option}
                                    value="Ostatní">
                                    Ostatní
                                </option>
                            </select>
                        )}
                        <div
                            className={styles.formBtn}
                            onClick={createTransaction}>
                            <p>Přidat transakci</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    } else {
        return <Loading />;
    }
}
export default AddTransaction;
