import Header from "./Header";
import styles from "../styles/Layout.module.css";
import Image from "next/image";
import ClientOnly from "./ClientOnly";

const Layout = ({ children }: any) => {
    return (
        <div className={styles.container}>
            <div className={styles.bgWrap}>
                <Image
                    alt="Background"
                    src="/background.jpg"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            <Header />
            <ClientOnly className={styles.clientOnly}>{children}</ClientOnly>
        </div>
    );
};

export default Layout;
