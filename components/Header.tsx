import styles from "../styles/Header.module.css";
import Head from "next/head";
import Link from "next/link";

const Header = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>WeMeet</title>
                <meta name="description" content="The meeting scheduler" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Link href="/">
                <a>
                    <h1 className={styles.title}>WeMeet</h1>
                </a>
            </Link>
            <p>Schedule meetings.</p>
        </div>
    );
};

export default Header;
