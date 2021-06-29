import styles from "../styles/MeetingListItem.module.css";

const MeetingListItem = () => {
    return (
        <div className={styles.container}>
            <div>
                <h3>Title</h3>
                <p>description</p>
            </div>
            <div>
                <h3>Date</h3>
            </div>
        </div>
    );
};

export default MeetingListItem;
