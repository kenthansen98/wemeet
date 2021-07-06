import { useRouter } from "next/router";
import { gql, request } from "graphql-request";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import { Meeting } from "@prisma/client";

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

    return (
        <Layout>
            <div className={styles.container}>
                <h3 className={styles.title}>{(data.getMeeting as Meeting).name} dashboard</h3>
            </div>
        </Layout>
    );
};

export default SingleMeeting;
