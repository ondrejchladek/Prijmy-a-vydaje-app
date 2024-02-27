import React from "react";
import "firebase/auth";
import "firebase/firestore";
import styles from "../../styles/Charts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestion,
    faCashRegister,
    faFolder,
    faIceCream,
    faCar,
    faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Pie } from "react-chartjs-2";

export default function BlankChart() {
    const data = {
        labels: ["Práce", "Investice", "Ostatní"],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: [
                    "rgba(57, 57, 249,0.5)",
                    "rgba(5, 5, 220,0.7)",
                    "rgba(86, 64, 167,0.3)",
                ],
                hoverBackgroundColor: [
                    "rgba(57, 57, 249,0.5)",
                    "rgba(5, 5, 220,0.7)",
                    "rgba(86, 64, 167,0.3)",
                ],
            },
        ],
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.IncomeTitle}>Přijmy</div>
            <div
                style={{
                    padding: 10,
                    marginTop: 25,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignSelf: "center",
                        width: "40%",
                        marginBottom: "5%",
                    }}>
                    <div className={styles.Category}>
                        <div
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <FontAwesomeIcon
                                icon={faFolder}
                                className={styles.Icons}
                            />
                            <div className={styles.TitleText}>Práce</div>
                        </div>
                        <div>{0} Kč</div>
                    </div>
                    <div className={styles.Category}>
                        <div
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <FontAwesomeIcon
                                icon={faCashRegister}
                                className={styles.Icons}
                            />
                            <div className={styles.TitleText}>Investice</div>
                        </div>
                        <div>{0} Kč</div>
                    </div>
                    <div className={styles.Category}>
                        <div
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <FontAwesomeIcon
                                icon={faQuestion}
                                className={styles.Icons}
                            />
                            <div className={styles.TitleText}>Ostatní</div>
                        </div>
                        <div>{0} Kč</div>
                    </div>
                </div>
                <div style={{ marginTop: 15 }}></div>
                <div
                    style={{
                        width: "300px",
                        justifyContent: "center",
                        alignSelf: "center",
                    }}>
                    <Pie data={data} width={400} height={400} />
                </div>
            </div>
            <div className={styles.IncomeTitle}>Výdaje</div>
            <div
                style={{
                    padding: 10,
                    marginTop: 25,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignSelf: "center",
                        width: "40%",
                        marginBottom: "5%",
                    }}>
                    <div className={styles.Category}>
                        <div
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <FontAwesomeIcon
                                icon={faFileAlt}
                                className={styles.Icons}
                            />
                            <div className={styles.TitleText}>Složenky</div>
                        </div>
                        <div>{0} Kč</div>
                    </div>
                    <div className={styles.Category}>
                        <div
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <FontAwesomeIcon
                                icon={faIceCream}
                                className={styles.Icons}
                            />
                            <div className={styles.TitleText}>Jídlo</div>
                        </div>
                        <div>{0} Kč</div>
                    </div>
                    <div className={styles.Category}>
                        <div
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <FontAwesomeIcon
                                icon={faCar}
                                className={styles.Icons}
                            />
                            <div className={styles.TitleText}>Auto</div>
                        </div>
                        <div>{0} Kč</div>
                    </div>
                    <div className={styles.Category}>
                        <div
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <FontAwesomeIcon
                                icon={faQuestion}
                                className={styles.Icons}
                            />
                            <div className={styles.TitleText}>Ostatní</div>
                        </div>
                        <div>{0} Kč</div>
                    </div>
                </div>
                <div style={{ marginTop: 15 }}></div>
                <div
                    style={{
                        width: "300px",
                        justifyContent: "center",
                        alignSelf: "center",
                    }}>
                    <Pie data={data} width={400} height={400} />
                </div>
            </div>
        </div>
    );
}
