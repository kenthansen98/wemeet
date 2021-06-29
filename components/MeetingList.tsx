import Link from "next/link";
import AddButton from "./AddButton";
import styles from "../styles/MeetingList.module.css";
import MenuListItem from "./MeetingListItem";

const MeetingList = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>My meetings</h3>
            <div className={styles.meetingItem}>
                <MenuListItem />
            </div>
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
