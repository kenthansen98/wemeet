import { useState } from "react";
import { useRouter } from "next/router";
import { gql, request } from "graphql-request";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import { Meeting } from "@prisma/client";
import dayjs from "dayjs";

import Layout from "../../components/Layout";
import styles from "../../styles/SingleMeeting.module.css";

const query = gql`
    query ($id: Int!) {
        getMeeting(id: $id) {
            name
            description
            dateRanges {
                start
                end
                user {
                    username
                }
            }
            participants {
                username
                dateRanges {
                    start
                    end
                }
            }
        }
    }
`;

const fetcher = (query: string, id: string) =>
    request("/api/graphql", query, { id: parseInt(id) });

const SingleMeeting = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR([query, id], fetcher);

    const [displayMonth, setDisplayMonth] = useState(dayjs());

    if (error) {
        router.push("/");
    } else if (!data) {
        return (
            <Layout>
                <GridLoader
                    color="#e0ac92"
                    css="align-self: center; margin-top: 3rem;"
                />
            </Layout>
        );
    }

    const baseColor = Math.floor(Math.random()*16777215);
    const userColors = (data.getMeeting.participants as any[]).map((_participant, i) => "#"+(baseColor + 10000 * i).toString(16));
    console.log(userColors);
    console.log(data);

    return (
        <Layout>
            <div className={styles.container}>
                <h3 className={styles.title}>
                    {(data.getMeeting as Meeting).name} dashboard
                </h3>
                <div className={styles.boxContainer}>
                    <div className={styles.participants}>
                        <h4>Participants</h4>
                        <ul>
                            {(data.getMeeting.participants as any[]).map(
                                (participant, i) => (
                                    <li key={i} style={{ color: userColors[i] }}>{participant.username}</li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className={styles.calendar}>
                        <div className={styles.calendarBox}>
                            <h4>{displayMonth.format("MMMM")}</h4>
                            <div className={styles.grid}>
                                {Array(dayjs().daysInMonth())
                                    .fill(0)
                                    .map((day, i) => (
                                        <div style={{ display: "flex" }}>
                                            <div style={{ marginRight: "0.2rem" }}>
                                                {(data.getMeeting.participants as any[]).map((participant, index) => (participant.dateRanges as any[]).map((range) => dayjs(range.start).date() - 1).includes(i) ? <div style={{ width: "10px", height: "10px", borderRadius: "5px", backgroundColor: userColors[index] }}/> : <div style={{width: "10px"}}/>)}
                                            </div> 
                                            <div className={styles.day}>{i + 1}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className={styles.calendarBox}>
                            <h4>Times</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SingleMeeting;
