import styles from "../styles/AddButton.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

const AddButton: React.FC<Props> = ({ text, ...props }) => {
    return <button {...props} className={styles.button} >{text}</button>;
};

export default AddButton;
