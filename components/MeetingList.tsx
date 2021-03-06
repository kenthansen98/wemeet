import Link from "next/link";
import useSWR from "swr";
import { gql, request } from "graphql-request";
import { GridLoader } from "react-spinners";
import { Meeting } from ".prisma/client";

import AddButton from "./AddButton";
import styles from "../styles/MeetingList.module.css";
import MenuListItem from "./MeetingListItem";

const query = gql`
    query {
        getMeetings {
            id
            name
            description
        }
    }
`;

const fetcher = (query: string) => request("/api/graphql", query);

const MeetingList = () => {
    const { data, error } = useSWR(query, fetcher);

    if (!data) {
        return (
            <GridLoader
                color="#e0ac92"
                css="align-self: center; margin-top: 3rem;"
            />
        );
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>My meetings</h3>
            {(data.getMeetings as Meeting[]).map((meeting, i) => (
                <Link key={i} href={`/meeting/${meeting.id}`}>
                    <a>
                        <div className={styles.meetingItem}>
                            <MenuListItem meeting={meeting} />
                        </div>
                    </a>
                </Link>
            ))}
            <div className={styles.link}>
                <Link href="/create-meeting">
                    <a>
                        <AddButton text="Create Meeting" />
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default MeetingList;
