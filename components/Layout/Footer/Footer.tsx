import Link from "next/link";
import classnames from "classnames";
import styles from './Footer.module.css';
import {FooterProps} from "./Footer.props";
import {getRuYear} from "@/helpers/index";

export const Footer = ({className, ...props}: FooterProps):JSX.Element => {
    return (
        <footer className={classnames(className, styles.footer)} {...props} role={'contentinfo'}>
            <div>{`OwlTop © 2020 - ${getRuYear(new Date())} Все права защищены`}</div>
            <Link href={'/'}>Пользовательское соглашение</Link>
            <Link href={'/'}>Политика конфиденциальности</Link>
        </footer>
    );
};