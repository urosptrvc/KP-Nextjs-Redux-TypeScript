import {Ad} from "@/lib/types/ad";
import Header from "@/components/Header";
import AdDetails from "@/components/AdComponents/AdDetails";
import AdCard from "@/components/AdComponents/AdCard";
import styles from "@/styles/AdView.module.css";
import Link from "next/link";

interface AdViewProps {
    ad: Ad;
    error?: {
        error_code: string;
    };
}

export default function AdView({ad, error}: AdViewProps) {
    if (error?.error_code === "ad_deleted") {
        ad.name = "Oglas je obrisan";
    }
    return (
        <>
            <Header title={`${ad.name} otvoren oglas`}/>
            {error?.error_code === "ad_deleted" ? (
                <main className={styles.main}>
                    <div className={styles.arrow}>
                        <Link className={styles.back} href="/">
                            &lt; Nazad na listu
                        </Link>
                    </div>
                    <AdCard
                        ad={ad}
                        disabled={true}
                    />
                </main>
            ) : (
                <AdDetails ad={ad}/>
            )}
        </>
    );
}

AdView.getInitialProps = async ({query}: { query: { adId?: string } }) => {
    const res = await fetch(`http://localhost:3000/api/ad/${query.adId}`);
    const data = await res.json();

    if (res.status === 404) {
        return {error: data, ad: data};
    }

    return {ad: data};
};
