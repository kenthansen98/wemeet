import { Meeting } from "@prisma/client";
import styles from "../styles/MeetingListItem.module.css";

interface Props {
    meeting: Meeting;
}

const MeetingListItem: React.FC<Props> = ({ meeting }) => {
    return (
        <div className={styles.container}>
            <div>
                <h3>{meeting.name}</h3>
                <p>{meeting.description}</p>
            </div>
            <div>
                <h3>Date: TBD</h3>
            </div>
        </div>
    );
};

export default MeetingListItem;
