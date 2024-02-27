import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import Balance from "../components/balance/balance";
import BalanceBlank from "../components/balance/balanceBlank";
import TransactionList from "../components/transactionList/transactionList";
import IncomeChart from "../components/charts/incomeChart";
import ExpenseChart from "../components/charts/expenseChart";
import BlankChart from "../components/charts/blankCharts";
import { useAuth } from "../services/auth";
import nookies from "nookies";
import { verifyIdToken } from "../services/firebaseAdmin";
import firebaseClient from "../services/firebaseClient";
import TransactionListBlank from "../components/transactionList/transactionListBlank";
import NavBar from "../components/navbar/navbar";

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
export default function Dashboard({ session }) {
    const { user } = useAuth();
    firebaseClient();

    if (session) {
        const [Name, setName] = useState("");
        const [currentUserUID, setCurrentUserUID] = useState(null);

        useEffect(() => {
            async function getUserInfo() {
                if (user != null) {
                    //Getting user Name
                    let doc = await firebase
                        .firestore()
                        .collection("users")
                        .doc(user.uid)
                        .get();
                        if (doc.exists) {
                            alert("No user data found!");
                        } else {
                            let dataObj = doc.data();
                            setName(doc.Name);
                        }

                    setCurrentUserUID(user.uid);
                } else {
                    return;
                }
            }
            getUserInfo();
        });
        return (
            <main className={styles.container}>
                <h1 className={styles.title}>Přijmy a výdaje</h1>
                <Head>
                    <title>Dashboard | Přijmy a výdaje</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#4083E6" />
                    <meta
                        name="description"
                        content="Osobní finanční aplikace."
                    />
                </Head>

                <div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}>
                        <NavBar />
                    </div>
                    <div className={styles.wrapper}>
                        {currentUserUID != null ? (
                            <div>
                                <Balance uid={currentUserUID} />
                                <b className={styles.subtitle}>
                                    Transakční historie
                                </b>
                                <TransactionList uid={currentUserUID} />{" "}
                            </div>
                        ) : (
                            <div>
                                <BalanceBlank />
                                <b className={styles.subtitle}>
                                Transakční historie
                                </b>
                                <TransactionListBlank />
                            </div>
                        )}
                        <div style={{ marginTop: "50px" }}>
                            <b className={styles.subtitle}>Analytické shrnutí</b>
                            {currentUserUID != null ? (
                                <div>
                                    <IncomeChart
                                        uid={currentUserUID}
                                        summary={true}
                                    />
                                    <ExpenseChart
                                        uid={currentUserUID}
                                        summary={true}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <BlankChart />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        );
    } else {
        Router.push("/login");
    }
}
