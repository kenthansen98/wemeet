import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import styles from "../styles/CreateMeeting.module.css";
import AddButton from "../components/AddButton";

const CREATE_MEETING = gql`
    mutation ($data: MeetingCreateInput!) {
        createMeeting(data: $data) {
            id
            name
            description
        }
    }
`;

const CreateMeeting = () => {
    const router = useRouter();
    const [createMeeting, { data }] = useMutation(CREATE_MEETING);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = await createMeeting({
            variables: {
                data: {
                    name: name,
                    description: description,
                },
            },
        });
        setName("");
        setDescription("");
        router.push(`meeting/${result.data.createMeeting.id}`);
    };

    return (
        <Layout>
            <div className={styles.container}>
                <h3 className={styles.title}>Create a meeting</h3>
                <form onSubmit={onSubmit} className={styles.form}>
                    <label className={styles.label} htmlFor="name">
                        Meeting Name
                    </label>
                    <input
                        className={styles.input}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label className={styles.label} htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className={styles.textarea}
                        id="description"
                        name="description"
                        autoComplete="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <AddButton
                        type="submit"
                        text="Create"
                        style={{ marginTop: "0.5rem" }}
                    />
                </form>
            </div>
        </Layout>
    );
};

export default CreateMeeting;
