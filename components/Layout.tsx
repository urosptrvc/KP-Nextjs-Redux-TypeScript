import Link from 'next/link';
import { Star, Home } from 'lucide-react';
import styles from '../styles/Layout.module.css';
import {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>
                        <Home size={24} />
                        <span>Pocetna</span>
                    </Link>
                </nav>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <img src="/logo.svg" alt="logo" width={158} height={66} />
                    </Link>
                </div>
                <nav className={styles.nav}>
                    <Link href="/favorites" className={styles.navLink}>
                        <Star size={24} />
                        <span>Zapraceni oglasi</span>
                    </Link>
                </nav>
            </header>
            {children}
            <footer className={styles.footer}>
                KupujemProdajem © 2022 All rights reserved
            </footer>
        </>
    );
};