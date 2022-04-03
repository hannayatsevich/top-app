import {LayoutProps} from "./Layout.props";
import {Header, Sidebar, Footer} from "../../components";
import React, {FunctionComponent} from "react";
import styles from './Layout.module.css';
import {AppContextProvider, IAppContext} from "../../contexts/app.context";

export const Layout: React.FC<LayoutProps> = ({children}) => {

    return (
        <div className={styles['page-wrapper']}>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
            <main className={styles.main}>
                {children}
            </main>
            <Footer className={styles.footer}/>
            <Up />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T):JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props}/>
                </Layout>
            </AppContextProvider>
        );
    };
};