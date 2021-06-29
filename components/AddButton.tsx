import styles from "../styles/AddButton.module.css";

interface Props {
    text: string;
}

const AddButton: React.FC<Props> = ({ text }) => {
    return <button className={styles.button}>{text}</button>;
};

export default AddButton;
