import React, { useState, useEffect } from "react";
//import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Head from "next/head";
import styles from "../styles/analyticsPage.module.css";
import IncomeChart from "../components/charts/incomeChart";
import ExpenseChart from "../components/charts/expenseChart";
import BlankChart from "../components/charts/blankCharts";
import { useAuth } from "../services/auth";
import firebaseClient from "../services/firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../services/firebaseAdmin";
import Loading from "./loadingPage";
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

export default function Analytics({ session }) {
    const { user } = useAuth();
    firebaseClient();

    if (user != null) {
        return (
            <main className={styles.container}>
                <h1 className={styles.title}>Analytické shrnutí</h1>
                <Head>
                    <title>Analytické shrnutí | Přijmy a výdaje</title>
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
                        {user.uid != null ? (
                            <div>
                                <IncomeChart uid={user.uid} summary={false} />
                                <ExpenseChart uid={user.uid} summary={false} />
                            </div>
                        ) : (
                            <div>
                                <BlankChart />
                                <BlankChart />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        );
    } else {
        return <Loading />;
    }
}
