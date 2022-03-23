import {LayoutProps} from "./Layout.props";
import {Header, Sidebar, Footer} from "../../components";
import {FunctionComponent} from "react";
import styles from './Layout.module.css';

export const Layout = ({children}: LayoutProps):JSX.Element => {

    return (
        <div className={styles['page-wrapper']}>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
            <main className={styles.main}>
                {children}
            </main>
            <Footer className={styles.footer}/>
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T):JSX.Element {
        return (
            <Layout>
                <Component {...props}/>
            </Layout>
        );
    };
};