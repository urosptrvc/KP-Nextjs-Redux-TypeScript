import {Ad} from "@/lib/types/ad";
import Header from "@/components/Header";
import AdDetails from "@/components/AdComponents/AdDetails";
import AdCard from "@/components/AdComponents/AdCard";
import styles from "@/styles/AdView.module.css";
import Link from "next/link";
import {GetServerSideProps} from "next";

interface AdViewProps {
    ad: Ad;
    error?: {
        error_code: string;
    };
}

export default function AdView({ad, error}: AdViewProps) {

    const content = error?.error_code === "ad_deleted" ? (
        <main className={styles.main}>
            <div className={styles.arrow}>
                <Link className={styles.back} href="/">
                    &lt; Nazad na listu
                </Link>
            </div>
            <AdCard
                ad={ad}
                disabled={true}
                error={error}
            />
        </main>
    ) : (
        <AdDetails ad={ad}/>
    );

    return (
        <>
            <Header title={`${ad.name} otvoren oglas`}/>
            {content}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({query}: { query: { adId?: string } }) => {
    if (!query.adId) {
        return {
            notFound: true
        };
    }

    const res = await fetch(`http://localhost:3000/api/ad/${query.adId}`);
    const data = await res.json();

    if (res.status === 404) {
        return {
            props: {
                error: data,
                ad: data
            }
        };
    }

    return {
        props: {
            ad: data
        }
    };
}