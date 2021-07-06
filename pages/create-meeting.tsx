import Layout from "../components/Layout";
import styles from "../styles/CreateMeeting.module.css";
import AddButton from "../components/AddButton";

const CreateMeeting = () => {
    const createMeeting = async (event: React.FormEvent) => {
        event.preventDefault();
        // console.log(event.target.name.value);
    };

    return (
        <Layout>
            <div className={styles.container}>
                <h3 className={styles.title}>Create a meeting</h3>
                <form onSubmit={createMeeting} className={styles.form}>
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
                    />
                    <label className={styles.label} htmlFor="description">
                        Description
                    </label>
                    <input
                        className={styles.input}
                        id="description"
                        name="description"
                        type="text"
                        autoComplete="description"
                    />
                    <AddButton type="submit" text="Create" style={{ marginTop: "0.5rem",  }}/>
                </form>
            </div>
        </Layout>
    );
};

export default CreateMeeting;
